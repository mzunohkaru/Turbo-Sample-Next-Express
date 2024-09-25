import { Request, Response, Router } from 'express'

import prisma from '@repo/database'
import { UserResponse } from '@repo/schema'

import { hashPassword, comparePassword } from '../lib/hash'
import { generateToken } from '../lib/token'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  const { userName, email, password } = req.body
  const hashedPassword = await hashPassword(password)
  const user: UserResponse = await prisma.users.create({
    data: { userName, email, password: hashedPassword },
  })
  res.status(201).json(user)
})

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.users.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: 'ユーザーが見つかりません' })
  }
  const isPasswordCorrect = await comparePassword(password, user.password)
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: 'パスワードが間違っています' })
  }
  const token = await generateToken({ id: user.id })
  res.json({ token })
})

export default router
