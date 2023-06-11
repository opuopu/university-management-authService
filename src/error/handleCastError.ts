import mongoose from 'mongoose'
import { IgenericErrorResponse } from '../interface/common'

const handleCastError = (
  err: mongoose.Error.CastError
): IgenericErrorResponse => {
  const errors = [
    { path: err.path, message: `Invalid ${err.path}: ${err.value}` },
  ]

  const statusCode = 400
  return {
    statusCode: statusCode,
    message: 'cast error',
    errormessages: errors,
  }
}
export default handleCastError
