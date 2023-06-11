import express from 'express'

import validateRequest from '../../middlewares/validate-Request'
import AcademicSemesterController from './academic_semester.controller'
import AcademicZodvaliDation from './academic_semester.validation'
const router = express.Router()

router.post(
  '/createSemester',
  validateRequest(AcademicZodvaliDation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemesterM
)
router.delete('/delete/:id', AcademicSemesterController.deleteSemester)
router.get('/getsemesters', AcademicSemesterController.getAllSemester)
router.get('/getsemester/:id', AcademicSemesterController.getSingleSemester)
router.patch(
  '/update/:id',
  validateRequest(AcademicZodvaliDation.UpdateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)

export const semesterRoutes = router
