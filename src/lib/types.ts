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

export type History = FetchSchemaType[]

export type Theme = 'dark' | 'light' | 'system'

export type Settings = {
  theme: Theme
  aiProvider: AIProvider
}

// AI GENERATION
export const AI_PROVIDERS = {
  OLLAMA: 'ollama',
} as const

export type AIProvider = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS]

export const MODELS = {
  [AI_PROVIDERS.OLLAMA]: 'llama3.1:latest',
} as const

export type Model = (typeof MODELS)[keyof typeof MODELS]
