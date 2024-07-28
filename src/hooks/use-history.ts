import { useLocalStorage } from 'usehooks-ts'

import { FetchSchemaType } from '@/lib/types'

export const useHistory = () => {
  const [history, setHistory, removeHistory] = useLocalStorage<
    FetchSchemaType[]
  >('history', [])

  const mutateHistory = {
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
    clear: removeHistory,
  }

  return { history, mutateHistory }
}
