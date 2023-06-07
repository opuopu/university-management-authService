import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { createsemester } from './academic_semester.service'
export const createAcademicSemesterM = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await createsemester(req.body)
    next()
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'semester created',
      data: result,
    })
  }
)
