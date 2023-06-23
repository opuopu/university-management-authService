import express from 'express'
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

const authRoute = router
export default authRoute
