import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRouter from './router/auth'
import userRouter from './router/user'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello, Express!')
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
