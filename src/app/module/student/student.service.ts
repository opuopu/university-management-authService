import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import Apierror from '../../../error/Apierror'
import IGenericResponse from '../../../interface/IgenericResponse'
import { IgetStudentOptions } from '../../../interface/pagination'
import calculatePagination from '../../../shared/paginationHelper'
import { studentSearchableFields } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { Student } from './student.model'

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IgetStudentOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudent = async (
  id: string
): Promise<{ data: IStudent | null }> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return {
    data: result,
  }
}

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<{ data: IStudent | null }> => {
  const isExist = await Student.findOne({ id })

  if (!isExist) {
    throw new Apierror(httpStatus.NOT_FOUND, 'Student not found !')
  }

  const { name, guardian, localGuardian, ...studentData } = payload
  const updateStudentData: Partial<IStudent> = { ...studentData }
  if (name && Object.keys(name).length) {
    for (const key in name) {
      // eslint-disable-next-line no-prototype-builtins
      if (name.hasOwnProperty(key)) {
        const nameKey = `name.${key}`
        ;(updateStudentData as any)[nameKey] = name[key as keyof typeof name]
      }
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const key in guardian) {
      // eslint-disable-next-line no-prototype-builtins
      if (guardian.hasOwnProperty(key)) {
        const gurdianKey = `guardian.${key}`
        ;(updateStudentData as any)[gurdianKey] =
          guardian[key as keyof typeof guardian]
      }
    }
  }
  // way number 2 using object.entries
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.entries(localGuardian).forEach(([key, value]) => {
      const localGuardianKey = `localGuardian.${key}`
      ;(updateStudentData as any)[localGuardianKey] = value
    })
  }
  const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  })
  return {
    data: result,
  }
}

const deleteStudent = async (
  id: string
): Promise<{ data: IStudent | null }> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return {
    data: result,
  }
}

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
