import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academic_faculty/academic_faculty.interface'
import { IStudent } from '../student/student.interface'

export type Iuser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IAcademicFaculty
  admin?: Types.ObjectId
}
export type UserModel = Model<Iuser, object>
