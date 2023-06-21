/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'

import httpStatus from 'http-status'
import Apierror from '../../../error/Apierror'
import IGenericResponse from '../../../interface/IgenericResponse'
import calculatePagination from '../../../shared/paginationHelper'
import { user } from '../users/user.model'

import { facultySearchableFields } from './faculty.constant'
import { IAcademicFacultyFilters, IFaculty } from './faculty.interface'
import { UserFaculty } from './faculty.model'

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: any
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await UserFaculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await UserFaculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await UserFaculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await UserFaculty.findOne({ id })

  if (!isExist) {
    throw new Apierror(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const { name, ...FacultyData } = payload
  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>
      ;(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await UserFaculty.findOneAndUpdate(
    { id },
    updatedFacultyData,
    {
      new: true,
    }
  )
  return result
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await user.findOne({ id })

  if (!isExist) {
    throw new Apierror(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //delete faculty first
    const faculty = await UserFaculty.findOneAndDelete({ id }, { session })
    if (!faculty) {
      throw new Apierror(404, 'Failed to delete student')
    }
    //delete user
    await user.deleteOne({ id })
    session.commitTransaction()
    session.endSession()

    return faculty
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
