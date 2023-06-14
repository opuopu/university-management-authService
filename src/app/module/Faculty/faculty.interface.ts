import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academic_department/academic_department.interface'
import { IAcademicFaculty } from '../academic_faculty/academic_faculty.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}
export type FBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-'

export type IFaculty = {
  id: string
  name: UserName
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: FBloodGroup
  presentAddress: string
  permanentAddress: string
  gender: 'male' | 'female'
  designation: string
  academicFaculty: Types.ObjectId | IAcademicFaculty // reference _id
  academicDepartment: Types.ObjectId | IAcademicDepartment // // reference _id

  profileImage?: string
}
export type FacultyModel = Model<IFaculty, Record<string, unknown>>
