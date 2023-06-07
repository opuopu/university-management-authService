import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/GlobalErrorHandler'
import routers from './app/routes'
export const app: Application = express()
export const port = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routers)

// global error handler

app.get('/', async (req, res) => {
  // res.send('database connected')
  res.send('working ')
})

app.use(globalErrorHandler)
