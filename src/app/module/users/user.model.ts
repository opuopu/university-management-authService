import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { Iuser, UserModel } from './user.interface'
const userSchema = new Schema<Iuser, UserModel>(
  {
    id: { required: true, type: String, unique: true },
    role: { required: true, type: String },
    password: { required: true, type: String },
    student: {
      type: Schema.Types.ObjectId,

      ref: 'Student',
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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  )

  next()
})

export const user = model<Iuser, UserModel>('user', userSchema)
