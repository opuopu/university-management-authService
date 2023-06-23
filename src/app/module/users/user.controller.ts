import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Iuser } from './user.interface'
import { Create_Faculty, Create_Student, create_Admin } from './user.service'
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
export const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body
    const result = await create_Admin(admin, userData)

    sendResponse<Iuser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    })
  }
)
