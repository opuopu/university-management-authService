import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type Iuser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId
  admin?: Types.ObjectId
}
export type UserModel = Model<Iuser, object>
