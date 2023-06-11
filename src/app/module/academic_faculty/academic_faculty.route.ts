import express from 'express'
import AcademicFacultyController from './academic_faculty.controller'

const router = express.Router()
router.post(
  '/createFaculty',

  AcademicFacultyController.createAcademicFaculty
)

export const FacultyRoute = router
