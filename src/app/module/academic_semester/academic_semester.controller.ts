import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { IgetAllSemesterOptios } from '../../../interface/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import GetSemesterServices from './academic_semester.service'

export const createAcademicSemesterM = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await GetSemesterServices.createsemester(req.body)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'semester created',
      data: result,
    })
    next()
  }
)
// get
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions: IgetAllSemesterOptios = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await GetSemesterServices.getAllSemesters(paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      message: 'Getting all semesters',
      data: result.data,
    })
    next()
  }
)

const AcademicSemesterController = {
  createAcademicSemesterM,
  getAllSemester,
}
export default AcademicSemesterController
