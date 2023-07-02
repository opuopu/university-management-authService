import catchAsync from '../../../shared/catchAsync'

import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../../config'
import sendResponse from '../../../shared/sendResponse'
import { resultResponse } from './auth.interface'
import Authservice from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await Authservice.loginuser(req.body)
  const { refreshToken, ...others } = result
  // sent refresh token to cookies
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<resultResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User login Successfully',
    data: others,
  })
})

// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body
  const result = await Authservice.changepassword(
    passwordData,
    req.user as JwtPayload
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'password changed successfully',
    data: result,
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await Authservice.refreshToken(refreshToken)
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login Successfully',
    data: result,
  })
})
const authController = {
  loginUser,
  refreshToken,
  changePassword,
}
export default authController
