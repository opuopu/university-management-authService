import express from 'express'
import validateRequest from '../../middlewares/validate-Request'
import StudentController from './student.controller'
import { StudentValidaion } from './student.validation'
const router = express.Router()
router.get('/:id', StudentController.getSingleStudents)
router.get('/', StudentController.getAllStudents)

router.delete('/:id', StudentController.deletestudents)

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudents
)
export const StudentRoutes = router
