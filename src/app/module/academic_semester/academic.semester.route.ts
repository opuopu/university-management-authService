import express from 'express'
import validateRequst from '../../middlewares/validate-Request'
import { AcademicSemestervalidation } from './academic_semester.validation'
export const router = express.Router()

router.post(
  '/createuser',
  validateRequst(AcademicSemestervalidation.AcademicSemesterZodSchemas)
)
