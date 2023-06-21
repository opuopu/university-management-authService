import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import Apierror from '../../../error/Apierror'
import IacademicSemesterFilters from '../../../interface/IacademicsemesterFilters'
import IGenericResponse from '../../../interface/IgenericResponse'
import { IgetAllSemesterOptions } from '../../../interface/pagination'
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
  payload: IgetAllSemesterOptions,
  filters: IacademicSemesterFilters
): Promise<IGenericResponse<IAcamadeciSemester[] | null>> => {
  // const { page = 1, limit = 10 } = payload
  const invoked = calculatePagination(payload)
  const { searchTerm, ...filtersField } = filters

  const academicSemesterSearchFields = ['title', 'year', 'code']

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
  // console.log(andCondition)
  if (Object.keys(filtersField).length) {
    andCondition.push({
      $and: Object.entries(filtersField).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, sortBy, sortOrder } = invoked
  const sort: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sort[sortBy] = sortOrder
  }

  const skip = (page - 1) * limit
  const WhereCondtion = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await AcamedicSemester.find(WhereCondtion)
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

// getSingle
const get_single_semester = async (
  id: string
): Promise<{ data: IAcamadeciSemester | null }> => {
  const result = await AcamedicSemester.findById({ _id: id })
  return {
    data: result,
  }
}
// updatedData
const updateSemesterS = async (
  id: string,
  payload: Partial<IAcamadeciSemester>
): Promise<{ data: IAcamadeciSemester | null }> => {
  if (
    payload.title &&
    payload.code &&
    academicsemesterTitleCodeMapper[payload.title] !== payload?.code
  ) {
    throw new Apierror(
      httpStatus.BAD_REQUEST,
      'please input valid title and code '
    )
  }
  const result = await AcamedicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return {
    data: result,
  }
}

// delete

const deleteSemesters = async (
  id: string
): Promise<{ data: IAcamadeciSemester | null }> => {
  const result = await AcamedicSemester.findByIdAndDelete(id)

  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'semester not found')
  }

  return {
    data: result,
  }
}
const GetSemesterServices = {
  createsemester,
  getAllSemesters,
  get_single_semester,
  updateSemesterS,
  deleteSemesters,
}
export default GetSemesterServices
