import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/GlobalErrorHandler'
import { GenerateStudentId } from './app/module/users/user.utils'
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

// NOT FOUND ERROR
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errormessages: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  })
  next()
})

const academicSemester = {
  title: 'Autumn',
  code: '01',
  year: '2025',
  startMonth: 'January',
  endMonth: 'May',
}
const test = GenerateStudentId(academicSemester)
console.log(test)

app.use(globalErrorHandler)
