import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import Apierror from '../../../error/Apierror'
import IGenericResponse from '../../../interface/IgenericResponse'
import { IgetAllfacultyOptions } from '../../../interface/pagination'
import calculatePagination from '../../../shared/paginationHelper'
import { academicFacultyFilterableFields } from './academic_faculty.constants'
import {
  IAcademicFaculty,
  IgetFacultyOptions,
} from './academic_faculty.interface'
import AcamedicFaculty from './academic_faculty.model'
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcamedicFaculty.create(payload)
  return result
}

const getAllfacultys = async (
  payload: IgetAllfacultyOptions,
  filters: IgetFacultyOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  // const { page = 1, limit = 10 } = payload

  const { searchTerm, ...filtersField } = filters

  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultyFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // console.log(andCondition)
  if (Object.keys(filtersField).length) {
    andCondition.push({
      $and: Object.entries(filtersField).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, sortBy, sortOrder } = calculatePagination(payload)
  const sort: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sort[sortBy] = sortOrder
  }

  const skip = (page - 1) * limit
  const WhereCondtion = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await AcamedicFaculty.find(WhereCondtion)
    .sort(sort)
    .skip(skip)
    .limit(limit)
  const total = await AcamedicFaculty.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// single
const getSingle_Faculty = async (
  id: string
): Promise<{ data: IAcademicFaculty | null }> => {
  const result = await AcamedicFaculty.findById({ _id: id })
  return {
    data: result,
  }
}
// update
const update_Faculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<{ data: IAcademicFaculty | null }> => {
  //  {
  //
  //   }
  const result = await AcamedicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  if (!result) {
    throw new Apierror(
      httpStatus.BAD_REQUEST,
      'please input valid title and code '
    )
  }
  return {
    data: result,
  }
}

// delete
const delete_Faculty = async (
  id: string
): Promise<{ data: IAcademicFaculty | null }> => {
  const result = await AcamedicFaculty.findByIdAndDelete(id)

  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'faculty not found')
  }

  return {
    data: result,
  }
}
const AcademicFacultyServices = {
  createFaculty,
  getAllfacultys,
  getSingle_Faculty,
  update_Faculty,
  delete_Faculty,
}
export default AcademicFacultyServices
