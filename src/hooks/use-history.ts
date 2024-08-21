import { useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { walkThroughSetUp } from '@/lib/constants'
import { FetchSchemaType } from '@/lib/types'

export const useHistory = () => {
  const [history, setHistory] = useLocalStorage<FetchSchemaType[]>(
    'history',
    walkThroughSetUp
  )

  const mutateHistory = useMemo(
    () => ({
      add: (item: FetchSchemaType) => {
        setHistory((prev) => {
          const historyMap = new Map(
            prev.map((i) => [`${i.endpoint}-${i.method}`, i])
          )
          historyMap.set(`${item.endpoint}-${item.method}`, item)

          return Array.from(historyMap.values())
        })
      },
      removeItem: (index: number) => {
        setHistory((prev) => {
          const newHistory = [...prev]
          newHistory.splice(index, 1)
          return newHistory
        })
      },
      clear: () => setHistory([]),
    }),
    []
  )

  return { history, mutateHistory }
}
