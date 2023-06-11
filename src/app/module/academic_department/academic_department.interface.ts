import { Model } from 'mongoose'

export type IAcademicDepartment = {
  title: string
}

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>
export type IAcademicDepartmentFilters = {
  searchTerm?: string
}
