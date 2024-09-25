import crypto from 'crypto'

export async function hashPassword(password: string): Promise<string> {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}

export async function comparePassword(
  password: string,
  hashPassword: string,
): Promise<boolean> {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex') === hashPassword
}
