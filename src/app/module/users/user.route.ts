import express from 'express'

import validateRequest from '../../middlewares/validate-Request'
import { CreateStudent, CreateUserFaculty } from './user.controller'
import { UserValidation } from './user.validation'
export const router = express.Router()
router.post(
  '/createStudent',
  validateRequest(UserValidation.studentZodSchema),
  CreateStudent
)
router.post(
  '/createUserFaculty',
  validateRequest(UserValidation.FacultyzodSchema),
  CreateUserFaculty
)
router.post(
  '/createAdmin',
  validateRequest(UserValidation.createAdminZodSchema),
  CreateUserFaculty
)
