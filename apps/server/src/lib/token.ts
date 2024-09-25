import jwt from 'jsonwebtoken'

import { TokenPayload } from '@repo/schema'

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_key'

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
}

export function verifyToken(token: string): object | string {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    return 'トークンが無効です'
  }
}
