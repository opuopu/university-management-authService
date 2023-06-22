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

const authRoute = router
export default authRoute
