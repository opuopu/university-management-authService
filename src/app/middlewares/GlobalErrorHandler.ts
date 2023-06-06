import { ErrorRequestHandler } from 'express'

import config from '../../config'
import Apierror from '../../error/Apierror'
import handleValidationError from '../../error/handleValidationError '
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  type IGenericerror = {
    path: string
    message: string
  }
  // handle validation error

  let statusCode = 500
  let message = 'internal server error'
  let erromessages: IGenericerror[] = []
  if (error?.name === 'handleValidationError') {
    const simplifiederror = handleValidationError(error)
    statusCode = simplifiederror.statusCode
    message = simplifiederror.message
    erromessages = simplifiederror.errormessages
  } else if (error instanceof Apierror) {
    statusCode = error?.statusCode
    message = error?.message
    erromessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    erromessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    erromessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}
export default globalErrorHandler
