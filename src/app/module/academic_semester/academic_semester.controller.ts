import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { filterableField, items } from '../../../constants/pagination-items'
import { IgetAllSemesterOptions } from '../../../interface/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import GetSemesterServices from './academic_semester.service'
// create
export const createAcademicSemesterM = catchAsync(
  async (req: Request, res: Response) => {
    const result = await GetSemesterServices.createsemester(req.body)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'semester created',
      data: result,
    })
    // next()
  }
)
// get

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableField)
  const paginationOptions: IgetAllSemesterOptions = pick(req.query, items)
  const result = await GetSemesterServices.getAllSemesters(
    paginationOptions,
    filters
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    message: 'Getting all semesters',
    data: result.data,
  })
  // next()
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await GetSemesterServices.get_single_semester(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting single semesters',
    data: result.data,
  })
})

// updateSemester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await GetSemesterServices.updateSemesterS(id, updatedData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated',
    data: result.data,
  })
})

// delete
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await GetSemesterServices.deleteSemesters(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester deleted',
    data: result.data,
  })
})
const AcademicSemesterController = {
  createAcademicSemesterM,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
export default AcademicSemesterController
