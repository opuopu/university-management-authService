import express from 'express'
import { ENUM_USER_ROLE } from '../../../enum/user'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validate-Request'
import AcademicFacultyController from './academic_faculty.controller'
import AcademicFacultyZodValidation from './academic_faculty.validation'

const router = express.Router()
router.post(
  '/createFaculty',
  validateRequest(AcademicFacultyZodValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
)

router.get(
  '/getAcademicFaculty',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT),
  AcademicFacultyController.getAllFaculty
)
router.get('/getsingleFaculty/:id', AcademicFacultyController.getSingleFaculty)
router.patch(
  '/update/:id',
  validateRequest(AcademicFacultyZodValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFaculty
)
router.delete('/delete/:id', AcademicFacultyController.deleteFaculty)

export const FacultyRoute = router
