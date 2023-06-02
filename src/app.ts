import cors from 'cors'
import express, { Application } from 'express'
import { router } from './app/module/users/user.route'
export const app: Application = express()
export const port = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.send('database is perfectly working')
})
app.use('/api/v1/users', router)
