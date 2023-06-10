import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import Apierror from '../../../error/Apierror'
import IacademicSemesterFilters from '../../../interface/IacademicsemesterFilters'
import IGenericResponse from '../../../interface/IgenericResponse'
import { IgetAllSemesterOptios } from '../../../interface/pagination'
import calculatePagination from '../../../shared/paginationHelper'
import { academicsemesterTitleCodeMapper } from './academic_semester.Constants'
import { IAcamadeciSemester } from './academic_semester.interface'
import AcamedicSemester from './academic_semester.model'

const createsemester = async (
  payload: IAcamadeciSemester
): Promise<IAcamadeciSemester> => {
  if (academicsemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'invalid semester code')
  }

  const semesterdata = await AcamedicSemester.create(payload)

  return semesterdata
}

// get all semester

const getAllSemesters = async (
  payload: IgetAllSemesterOptios,
  filters: IacademicSemesterFilters
): Promise<IGenericResponse<IAcamadeciSemester[]>> => {
  // const { page = 1, limit = 10 } = payload
  const invoked = calculatePagination(payload)
  const { searchTerm } = filters
  const academicSemesterSearchFields = ['titile', 'year', 'code']
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  const { page, limit, sortBy, sortOrder } = invoked
  const sort: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sort[sortBy] = sortOrder
  }

  const skip = (page - 1) * limit
  const result = await AcamedicSemester.find({ $and: andCondition })
    .sort(sort)
    .skip(skip)
    .limit(limit)
  const total = await AcamedicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const GetSemesterServices = {
  createsemester,
  getAllSemesters,
}
export default GetSemesterServices
