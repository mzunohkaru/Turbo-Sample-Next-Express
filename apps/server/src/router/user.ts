import { Request, Response, Router } from 'express'

import prisma from '@repo/database'
import { UserResponse } from '@repo/schema'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const users: UserResponse[] = await prisma.users.findMany()
  res.json(users)
})

export default router
