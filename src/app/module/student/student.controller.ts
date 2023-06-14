import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { filterableField } from '../../../constants/pagination-items'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { studentFilterableFields } from './student.constant'
import { IStudent } from './student.interface'
import { StudentService } from './student.service'

// get all
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, filterableField)

  const result = await StudentService.getAllStudents(filters, paginationOptions)

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

//   get single
const getSingleStudents = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.getSingleStudent(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting single student',
    data: result.data,
  })
})

//   update
const updateStudents = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await StudentService.updateStudent(id, updatedData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student updated',
    data: result.data,
  })
})

//   delete
const deletestudents = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await StudentService.deleteStudent(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student deleted',
    data: result.data,
  })
})

const StudentController = {
  getAllStudents,
  getSingleStudents,
  updateStudents,
  deletestudents,
}
export default StudentController
