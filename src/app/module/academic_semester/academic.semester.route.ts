import express from 'express'

import validateRequest from '../../middlewares/validate-Request'
import { createAcademicSemesterM } from './academic_semester.controller'
import AcademicSemesterZodSchemas from './academic_semester.validation'
const router = express.Router()

router.post(
  '/createSemester',
  validateRequest(AcademicSemesterZodSchemas),
  createAcademicSemesterM
)

export const semesterRoutes = router
