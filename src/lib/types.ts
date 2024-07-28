import { z } from 'zod'

import { fetchSchema } from '@/lib/schemas'

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum LanguageEnum {
  JSON = 'json',
  HTML = 'html',
}

export enum BodyTypeEnum {
  JSON = 'json',
  FORM = 'form-data',
}

export type Language = 'json' | 'html'

export type Result =
  | {
      method: Method
      status: number
      ok: boolean
      content: string
      headers?: Record<string, string>
      size?: string
      time?: string
      language?: Language
      cors?: boolean
    }
  | undefined

export type FetchSchemaType = z.infer<typeof fetchSchema>
