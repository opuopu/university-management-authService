import { Schema, model } from 'mongoose'
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

export const user = model<Iuser, UserModel>('user', userSchema)
