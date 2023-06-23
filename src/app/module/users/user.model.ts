import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUserMethods, Iuser, UserModel } from './user.interface'
const userSchema = new Schema<Iuser, UserModel, IUserMethods>(
  {
    id: { required: true, type: String, unique: true },
    role: { required: true, type: String },
    password: { required: true, type: String, select: 0 },
    student: {
      type: Schema.Types.ObjectId,

      ref: 'Student',
    },
    needPasswordChange: {
      required: true,
      type: 'Boolean',
      default: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,

      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,

      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Pick<
  Iuser,
  'id' | 'needPasswordChange' | 'password' | 'role'
> | null> {
  const isUserExist = await user.findOne(
    { id },
    { id: 1, needPasswordChange: 1, password: 1, role: 1 }
  )

  return isUserExist
}

userSchema.methods.isPassWordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const password = await bcrypt.compare(givenPassword, savedPassword)
  return password
}

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  )

  next()
})

export const user = model<Iuser, UserModel>('user', userSchema)
