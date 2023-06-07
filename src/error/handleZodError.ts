import { ZodError, ZodIssue } from 'zod'
import { IgenericErrorResponse } from '../interface/common'
import { IGenericErrorMessage } from '../interface/error'

const handleZodError = (error: ZodError): IgenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map(
    (zIssue: ZodIssue) => {
      return {
        path: zIssue.path[zIssue.path.length - 1],
        message: zIssue.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'validation zod error',
    errormessages: errors,
  }
}
export default handleZodError
