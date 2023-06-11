import catchAsync from '../../../shared/catchAsync'

import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import AcademicFacultyServices from './academic_faculty.service'
// create faculty
export const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.createFaculty(req.body)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'semester created',
      data: result,
    })
    // next()
  }
)

const AcademicFacultyController = {
  createAcademicFaculty,
}
export default AcademicFacultyController
