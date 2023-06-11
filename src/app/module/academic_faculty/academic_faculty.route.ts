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

router.get('/getAcademicFaculty', AcademicFacultyController.getAllFaculty)
router.get('/getsingleFaculty/:id', AcademicFacultyController.getSingleFaculty)
router.patch(
  '/update/:id',
  validateRequest(AcademicFacultyZodValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFaculty
)

export const FacultyRoute = router
