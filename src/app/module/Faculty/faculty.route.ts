import express from 'express'
import validateRequest from '../../middlewares/validate-Request'
import { FacultyController } from './faculty.controller'
import { FacultyValidation } from './faculty.validation'
const router = express.Router()

router.get('/:id', FacultyController.getSingleFaculty)
router.get('/', FacultyController.getAllFaculties)

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
)

router.delete('/:id', FacultyController.deleteFaculty)

export const UserFacultyRoute = router
