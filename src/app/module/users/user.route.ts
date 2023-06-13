import express from 'express'

import validateRequest from '../../middlewares/validate-Request'
import { CreateStudent } from './user.controller'
import { UserValidation } from './user.validation'
export const router = express.Router()
router.post(
  '/createStudent',
  validateRequest(UserValidation.studentZodSchema),
  CreateStudent
)
