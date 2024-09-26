import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

import authRouter from './router/auth'
import userRouter from './router/user'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

app.use(cors())
app.use(express.json())

app.use('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.post('/auth/test/signup', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) {
    res.status(400).json({ message: error.message })
  }
  res.json(data)
})

app.post('/auth/test/login', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  res.json(data)
})

app.post('/auth/test/otp', async (req, res) => {
  const { email } = req.body
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: process.env.CLIENT_URL,
    },
  })
  if (error) {
    res.status(400).json({ message: error.message })
  }
  res.json(data)
})

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.use((req, res) => {
  res.status(404).json({ message: '404 Not found' })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json({ message: err.message })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
