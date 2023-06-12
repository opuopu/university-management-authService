import { Model, Schema } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type Iuser = {
  id: string
  role: string
  password: string
  student?: Schema.Types.ObjectId | IStudent
  faculty?: Schema.Types.ObjectId
  admin?: Schema.Types.ObjectId
}
export type UserModel = Model<Iuser, object>
