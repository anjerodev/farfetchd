import { useLocalStorage } from 'usehooks-ts'

import { BodyTypeEnum, FetchSchemaType, Method } from '@/lib/types'

const walkThroughSetUp = [
  {
    endpoint: 'https://jsonplaceholder.typicode.com/posts',
    method: Method.POST,
    bodyType: BodyTypeEnum.JSON,
    body: '',
    reqTypes: `type Post {
  "title": string
  "body": string
  "userId": number
}`,
    headers: [
      {
        key: 'content-type',
        value: 'application/json; charset=UTF-8',
        secret: false,
      },
    ],
    params: [{ key: '', value: '' }],
  },
  {
    endpoint: 'https://jsonplaceholder.typicode.com/comments',
    method: Method.GET,
    bodyType: BodyTypeEnum.JSON,
    body: '',
    reqTypes: '',
    headers: [
      {
        key: 'content-type',
        value: 'application/json; charset=UTF-8',
        secret: false,
      },
    ],
    params: [{ key: 'postId', value: '1' }],
  },
]

export const useHistory = () => {
  const [history, setHistory, removeHistory] = useLocalStorage<
    FetchSchemaType[]
  >('history', walkThroughSetUp)

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
