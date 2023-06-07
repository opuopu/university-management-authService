import express from 'express'

import validateRequest from '../../middlewares/validate-Request'
import { createUsers } from './user.controller'
import { UserValidation } from './user.validation'
export const router = express.Router()
router.post(
  '/createuser',
  validateRequest(UserValidation.userSchema),
  createUsers
)
