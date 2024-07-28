import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import ky from 'ky'
import type { KyResponse, Options } from 'ky'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { fetchSchema } from '@/lib/schemas'
import { BodyTypeEnum, LanguageEnum, Method, Result } from '@/lib/types'
import { createSafeContext } from '@/lib/utils'
import { useHistory } from '@/hooks/use-history'

type FetcherContextValue = {
  form: UseFormReturn<z.infer<typeof fetchSchema>>
  isPending: boolean
  onSubmit: (values: z.infer<typeof fetchSchema>) => Promise<any>
  result?: Result
  clearResult: () => void
}

export const [FetcherContext, useFetcher] =
  createSafeContext<FetcherContextValue>({ name: 'FetcherProvider' })

interface ProviderProps {
  children: React.ReactNode
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

const defaultValues = {
  endpoint: 'http://localhost:3000',
  method: Method.GET,
  bodyType: BodyTypeEnum.JSON,
  body: '',
  reqTypes: `type User = {
  name: string
  age: number
  registered: boolean
  location: Location
}

type Location = {
  city: string
  postalCode: number
  country: string
}`,
  headers: [{ key: '', value: '' }],
  params: [{ key: '', value: '' }],
}

export const FetcherProvider = ({ children }: ProviderProps) => {
  const [result, setResult] = useState<Result>()
  const [isPending, setIsPending] = useState(false)
  const { mutateHistory } = useHistory()

  const form = useForm<z.infer<typeof fetchSchema>>({
    resolver: zodResolver(fetchSchema),
    defaultValues,
  })

  const clearResult = () => {
    setResult(undefined)
  }

  const onSubmit = async (values: z.infer<typeof fetchSchema>) => {
    console.log({ values })
    try {
      setIsPending(true)
      clearResult()
      const start = performance.now()

      const { endpoint, method, headers, body, bodyType, params } = values

      let language = LanguageEnum.HTML
      let content = ''
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

      if (params) {
        const [, searchParams] = endpoint.split('?')
        const search = new URLSearchParams(searchParams)

        params.forEach(({ key, value }) => {
          if (key === '') return

          search.append(key, value)
        })

        options.searchParams = search
      }

      console.log({ options })

      const response = await ky[method](endpoint, options)

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

      const resultValues = {
        method,
        status: response.status,
        ok: true,
        content,
        headers: respHeaders,
        size: `${totalSize.toFixed(1)} KB`,
        time: `${timeTaken.toFixed(0)}ms`,
        language,
      }

      setResult(resultValues)
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

      setResult(() => ({
        method: values.method,
        status: error.response?.status || 500,
        ok: false,
        content,
        language: LanguageEnum.HTML,
        cors,
      }))
    } finally {
      mutateHistory.add(values)
      setIsPending(false)
    }
  }

  return (
    <FetcherContext value={{ form, isPending, onSubmit, result, clearResult }}>
      {children}
    </FetcherContext>
  )
}
