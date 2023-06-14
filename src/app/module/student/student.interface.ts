import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academic_department/academic_department.interface'
import { IAcademicFaculty } from '../academic_faculty/academic_faculty.interface'
import { IAcademicSemesterModel } from '../academic_semester/academic_semester.interface'
export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}
export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}
type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type IStudent = {
  id: string
  name: UserName //embedded object
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: BloodGroup
  presentAddress: string
  permanentAddress: string
  guardian: Guardian // embedded object
  localGuardian: LocalGuardian // embedded object
  academicFaculty: Types.ObjectId | IAcademicFaculty // reference _id
  academicDepartment: Types.ObjectId | IAcademicDepartment // // reference _id
  academicSemester: Types.ObjectId | IAcademicSemesterModel // reference _id
  profileImage?: string
}
export type IStudentFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
export type StudentModel = Model<IStudent, Record<string, unknown>>
