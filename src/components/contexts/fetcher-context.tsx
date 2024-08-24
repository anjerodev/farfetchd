import { createContext, useContext, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'

import { fetchSchema } from '@/lib/schemas'
import { FetchSchemaType, Result } from '@/lib/types'
import { useHistory } from '@/hooks/use-history'

import { defaultValues, parseResponse } from './fetcher-context.utils'

type FetcherContextValue = {
  form: UseFormReturn<FetchSchemaType>
  isPending: boolean
  onSubmit: (values: FetchSchemaType) => void
  result?: Result
  clearResult: () => void
}

export const FetcherContext = createContext<FetcherContextValue>(
  {} as FetcherContextValue
)

interface ProviderProps {
  children: React.ReactNode
}

export const FetcherProvider = ({ children }: ProviderProps) => {
  const [result, setResult] = useState<Result>()
  const [isPending, setIsPending] = useState(false)
  const { mutateHistory } = useHistory()

  const form = useForm<FetchSchemaType>({
    resolver: zodResolver(fetchSchema),
    defaultValues,
  })

  const clearResult = () => {
    setResult(undefined)
  }

  const onSubmit = async (values: FetchSchemaType) => {
    setIsPending(true)
    clearResult()

    parseResponse(values).then((resultValues) => {
      // console.log({ resultValues })
      setResult(resultValues)
      mutateHistory.add(values)
      setIsPending(false)
    })
  }

  const providerValue: FetcherContextValue = {
    result,
    isPending,
    onSubmit,
    form,
    clearResult,
  }

  return (
    <FetcherContext.Provider value={providerValue}>
      {children}
    </FetcherContext.Provider>
  )
}

export const useFetcher = () => {
  const context = useContext(FetcherContext)

  if (context === undefined) {
    throw new Error('useFetcher must be used within a FetcherProvider')
  }

  return context
}
