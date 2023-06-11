import express from 'express'
import validateRequest from '../../middlewares/validate-Request'
import AcademicFacultyController from './academic_faculty.controller'
import AcademicFacultyZodValidation from './academic_faculty.validation'

const router = express.Router()
router.post(
  '/createFaculty',
  validateRequest(AcademicFacultyZodValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
)

router.get('/getAcademicFaculty')

export const FacultyRoute = router
