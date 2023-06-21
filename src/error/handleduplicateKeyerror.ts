import mongoose from 'mongoose'

function handleDuplicateKeyError(error: mongoose.Error) {
  const message = error.message

  const statusCode = 409
  return {
    success: false,
    statusCode,
    message: message,
    errormessages: [
      {
        path: '',
        message: message,
      },
    ],
    stack: error.stack,
  }

  // Handle other errors or re-throw the original error if it's not a duplicate key error
}
export default handleDuplicateKeyError
