import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/GlobalErrorHandler'
import { semesterRoutes } from './app/module/academic_semester/academic.semester.route'
import { router as useRoutes } from './app/module/users/user.route'
export const app: Application = express()
export const port = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', useRoutes)
app.use('/api/v1/academic-semesters', semesterRoutes)

// global error handler

app.get('/', async (req, res) => {
  // res.send('database connected')
  res.send('working ')
})

app.use(globalErrorHandler)
