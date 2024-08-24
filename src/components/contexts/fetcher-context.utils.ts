import ky from 'ky'
import type { KyResponse, Options } from 'ky'

import {
  BodyTypeEnum,
  FetchSchemaType,
  LanguageEnum,
  Method,
  Result,
} from '@/lib/types'

export const defaultValues = {
  endpoint: 'http://localhost:3000',
  method: Method.GET,
  bodyType: BodyTypeEnum.JSON,
  body: '',
  reqTypes: '',
  headers: [{ key: '', value: '', secret: false }],
  params: [{ key: '', value: '' }],
}

const parseHeaders = (response: KyResponse) => {
  const headers: Record<string, string> = {}
  let size = 0
  response.headers.forEach((value, key) => {
    headers[key] = value
    size += key.length + value.length
  })
  return { headers, size }
}

const buildFetch = async (
  args: FetchSchemaType
): Promise<[Response, number]> => {
  const { endpoint, method, headers, body, bodyType, params } = args

  let bodySize = 0

  const options: Options = {
    onDownloadProgress: (progress) => {
      bodySize = progress.transferredBytes
    },
  }

  if (method !== Method.GET) {
    if (bodyType === BodyTypeEnum.JSON) {
      if (typeof body === 'string' && body.length > 0) {
        options.body = body
      } else {
        options.body = undefined
      }
    } else {
      const formData = new FormData()
      if (Array.isArray(body)) {
        body?.forEach(({ key, value }) => {
          if (key === '' || value === '') return

          if (value instanceof Blob) {
            formData.append(key, value)
          } else {
            formData.append(key, JSON.stringify(value))
          }
        })
        options.body = formData
      }
    }
  }

  if (headers) {
    const headersObj: Record<string, string> = {}
    headers.forEach(({ key, value }) => {
      if (key === '') return
      headersObj[key] = value
    })

    options.headers = headersObj
  }

  const validParams = params.filter(({ key }) => key !== '')
  if (validParams.length > 0) {
    const [, searchParams] = endpoint.split('?')
    const search = new URLSearchParams(searchParams)

    params.forEach(({ key, value }) => {
      search.append(key, value)
    })

    options.searchParams = search
  }

  const resp = await ky[method](endpoint, options)

  return [resp, bodySize]
}

export const parseResponse = async (
  values: FetchSchemaType
): Promise<Result> => {
  try {
    const start = performance.now()

    let language = LanguageEnum.HTML
    let content = ''

    const [response, bodySize] = await buildFetch(values)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    //Check if the response is json or html
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('json')) {
      language = LanguageEnum.JSON
      const json = await response.json()
      content = JSON.stringify(json, null, 2)
    } else {
      content = await response.text()
    }

    const end = performance.now()
    const timeTaken = end - start

    const { size: respHeadersSize, headers: respHeaders } =
      parseHeaders(response)
    const totalSize = (bodySize + respHeadersSize) / 1024

    return {
      method: values.method,
      status: response.status,
      ok: true,
      content,
      headers: respHeaders,
      size: `${totalSize.toFixed(1)} KB`,
      time: `${timeTaken.toFixed(0)}ms`,
      language,
    }
  } catch (error: any) {
    let content = error.message
    let cors = false

    if (error.message === 'Failed to fetch') {
      // Possible CORS issue, suggest installing the farfetchd chrome extension.
      cors = true
    }

    if (error.response) {
      content = await error.response.text()
    }

    return {
      method: values.method,
      status: error.response?.status || 500,
      ok: false,
      content,
      language: LanguageEnum.HTML,
      cors,
    }
  }
}
