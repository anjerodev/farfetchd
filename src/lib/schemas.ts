import { z } from 'zod'

import { BodyTypeEnum, Method } from '@/lib/types'

export const BodyValueSchema = z.union([z.instanceof(Blob), z.string()])

export const fetchSchema = z.object({
  endpoint: z.string().url(),
  method: z.enum([
    Method.GET,
    Method.POST,
    Method.PUT,
    Method.PATCH,
    Method.DELETE,
  ]),
  body: z.union([
    z.string(),
    z.array(z.object({ key: z.string(), value: BodyValueSchema })),
  ]),
  bodyType: z.enum([BodyTypeEnum.JSON, BodyTypeEnum.FORM]),
  reqTypes: z.string(),
  headers: z.array(z.object({ key: z.string(), value: z.string() })),
  params: z.array(z.object({ key: z.string(), value: z.string() })),
})
