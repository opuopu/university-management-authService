import express from 'express'
import { ENUM_USER_ROLE } from '../../../enum/user'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validate-Request'
import authController from './auth.controller'
import authzodSchema from './auth.validation'

const router = express.Router()
router.post(
  '/login',
  validateRequest(authzodSchema.createAuthLoginZodSchema),
  authController.loginUser
)

router.post(
  '/refresh-token',
  validateRequest(authzodSchema.refreshTokenZodSchema),
  authController.refreshToken
)
router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(authzodSchema.changePasswordZodSchema),
  authController.changePassword
)

const authRoute = router
export default authRoute
