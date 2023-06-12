import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academic_faculty/academic_faculty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>
export type IAcademicDepartmentFilters = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
