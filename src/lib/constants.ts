import {
  AI_PROVIDERS,
  BodyTypeEnum,
  FetchSchemaType,
  Method,
  Settings,
} from '@/lib/types'

export const walkThroughSetUp: FetchSchemaType[] = [
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

export const defaultSettings: Settings = {
  theme: 'system',
  aiProvider: AI_PROVIDERS.OLLAMA,
}
