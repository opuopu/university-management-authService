import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academic_faculty/academic_faculty.interface'
import { IStudent } from '../student/student.interface'

export type Iuser = {
  id: string
  needPasswordChange: true | false
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IAcademicFaculty
  admin?: Types.ObjectId
}

export type IUserMethods = {
  isUserExist(
    id: string
  ): Promise<Pick<
    Iuser,
    'id' | 'needPasswordChange' | 'password' | 'role'
  > | null>
  isPassWordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<Iuser, object, IUserMethods>
