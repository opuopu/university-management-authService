import catchAsync from '../../../shared/catchAsync'

import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import Authservice from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await Authservice.loginuser(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login Successfully',
    data: result,
  })
})

const authController = {
  loginUser,
}
export default authController
