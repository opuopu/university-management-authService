import { SortOrder } from 'mongoose'
import IacademicSemesterFilters from '../../../interface/IacademicsemesterFilters'
import IGenericResponse from '../../../interface/IgenericResponse'
import { IgetAllfacultyOptions } from '../../../interface/pagination'
import calculatePagination from '../../../shared/paginationHelper'
import { academicFacultyFilterableFields } from './academic_faculty.constants'
import { IAcademicFaculty } from './academic_faculty.interface'
import AcamedicFaculty from './academic_faculty.model'
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcamedicFaculty.create(payload)
  return result
}
const getAllfacultys = async (
  payload: IgetAllfacultyOptions,
  filters: IacademicSemesterFilters
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

const AcademicFacultyServices = {
  createFaculty,
  getAllfacultys,
}
export default AcademicFacultyServices
