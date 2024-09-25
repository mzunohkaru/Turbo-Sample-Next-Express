import z from 'zod'

export const PostResponse = z.object({
  id: z.number(),
  content: z.string(),
  authorId: z.number(),
  createdAt: z.date(),
})

export type PostResponse = z.infer<typeof PostResponse>
