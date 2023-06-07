import { Schema, model } from 'mongoose'
import { Iuser, UserModel } from './user.interface'

const userSchema = new Schema<Iuser, UserModel>(
  {
    id: { required: true, type: String, unique: true },
    role: { required: true, type: String },
    password: { required: true, type: String },
  },
  {
    timestamps: true,
  }
)

export const user = model<Iuser, UserModel>('user', userSchema)
