import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'

import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import {
  facultyFilterableFields,
  facultySearchableFields,
} from './faculty.constant'
import { IFaculty } from './faculty.interface'
import { FacultyService } from './faculty.service'

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOptionss = pick(req.query, facultySearchableFields)

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptionss
  )

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculties retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.getSingleFaculty(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty retrieved successfully !',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await FacultyService.updateFaculty(id, updatedData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty updated successfully !',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.deleteFaculty(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty deleted successfully !',
    data: result,
  })
})

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
