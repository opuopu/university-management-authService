import mongoose from 'mongoose'
import { IgenericErrorResponse } from '../interface/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IgenericErrorResponse => {
  const errors = Object.values(err.errors).map(e => {
    return {
      path: e?.path,
      message: e?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode: statusCode,
    message: 'validation error',
    errormessages: errors,
  }
}
export default handleValidationError
