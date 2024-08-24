import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import * as babelParser from 'prettier/parser-babel'
import * as typescriptParser from 'prettier/parser-typescript'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import * as prettier from 'prettier/standalone'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSafeContext<ContextValue>({
  defaultValue = null,
  name,
  errorMessage,
}: {
  defaultValue?: ContextValue | null
  name?: string
  errorMessage?: string
}) {
  const Context = React.createContext<ContextValue | null>(defaultValue)

  if (name) {
    Context.displayName = name
  }

  const useSafeContext = () => {
    const ctx = React.useContext(Context)

    if (ctx === null) {
      throw new Error(
        errorMessage ?? `use${name} must be used within a ${name}Provider`
      )
    }

    return ctx
  }

  const Provider = Context.Provider

  return [Provider, useSafeContext] as const
}

export function formatTime(time: number) {
  if (time < 1000) {
    return `${time}ms`
  } else if (time < 60 * 1000) {
    return `${(time / 1000).toFixed(2)}s`
  } else {
    return `${(time / 1000 / 60).toFixed(2)}m`
  }
}

export function formatSize(size: number) {
  if (size < 1024) {
    return `${size}KB`
  } else {
    return `${(size / 1024).toFixed(2)}MB`
  }
}

export function preprocessJson(jsonString: string) {
  const jsonObject = JSON.parse(jsonString)
  const prettyJsonString = JSON.stringify(jsonObject)
  return prettyJsonString
}

export async function prettify({
  content,
  parser,
}: {
  content: string
  parser: 'json' | 'typescript'
}) {
  const formattedValue = await prettier.format(content, {
    parser,
    semi: false,
    plugins: [babelParser, typescriptParser, prettierPluginEstree],
  })

  return formattedValue
}
