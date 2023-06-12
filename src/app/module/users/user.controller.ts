import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { createUser } from './user.service'

export const createUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // await userSchema.parseAsync(req)
    const { ...userData } = req.body

    const result = await createUser(userData)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user  created',
      data: result,
    })
  }
)
