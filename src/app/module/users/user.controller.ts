import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Create_Faculty, Create_Student } from './user.service'
export const CreateStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // await userSchema.parseAsync(req)
    const { student, ...userData } = req.body

    const result = await Create_Student(student, userData)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user  created',
      data: result,
    })
  }
)

export const CreateUserFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body
    const result = await Create_Faculty(faculty, userData)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user  created',
      data: result,
    })
  }
)
