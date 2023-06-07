import express from 'express'

import validateRequst from '../../middlewares/validate-Request'
import { createUsers } from './user.controller'
import { UserValidation } from './user.validation'
export const router = express.Router()
router.post(
  '/createuser',
  validateRequst(UserValidation.userSchema),
  createUsers
)
