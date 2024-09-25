import z from 'zod'

export const UserResponse = z.object({
  id: z.number(),
  userName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type UserResponse = z.infer<typeof UserResponse>
