import catchAsync from '../../../shared/catchAsync'

import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { filterableField, items } from '../../../constants/pagination-items'
import { IgetAllfacultyOptions } from '../../../interface/pagination'
import pick from '../../../shared/pick'
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
// get faculty
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization)
  console.log(req.user)
  const filters = pick(req.query, filterableField)
  const paginationOptions: IgetAllfacultyOptions = pick(req.query, items)
  const result = await AcademicFacultyServices.getAllfacultys(
    paginationOptions,
    filters
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    message: 'Getting all faculty',
    data: result.data,
  })
  // next()
})

//

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyServices.getSingle_Faculty(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting single semesters',
    data: result.data,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedTitle = req.body
  const result = await AcademicFacultyServices.update_Faculty(id, updatedTitle)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' faculty updated ',
    data: result.data,
  })
})
// delete
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await AcademicFacultyServices.delete_Faculty(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester deleted',
    data: result.data,
  })
})
const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
export default AcademicFacultyController
