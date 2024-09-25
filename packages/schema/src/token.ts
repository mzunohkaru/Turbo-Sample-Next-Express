import z from 'zod'

export const TokenPayload = z.object({
  id: z.number()
})

export type TokenPayload = z.infer<typeof TokenPayload>
