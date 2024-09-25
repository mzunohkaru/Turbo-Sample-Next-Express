import z from 'zod'

export const PostResponse = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
})

export type PostResponse = z.infer<typeof PostResponse>
