import { NextFunction, Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { createUser } from './user.service'

export const createUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // await userSchema.parseAsync(req)
    const userdata = req.body
    next()
    const result = await createUser(userdata)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user  created',
      data: result,
    })
  }
)
