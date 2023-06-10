import express from 'express'

import validateRequest from '../../middlewares/validate-Request'
import AcademicSemesterController from './academic_semester.controller'
import AcademicSemesterZodSchemas from './academic_semester.validation'
const router = express.Router()

router.post(
  '/createSemester',
  validateRequest(AcademicSemesterZodSchemas),
  AcademicSemesterController.createAcademicSemesterM
)
router.get('/getsemesters', AcademicSemesterController.getAllSemester)
export const semesterRoutes = router
