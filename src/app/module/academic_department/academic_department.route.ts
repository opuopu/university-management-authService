import express from 'express'
import validateRequest from '../../middlewares/validate-Request'
import { AcademicDepartmentController } from './academic_department.controller'
import { AcademicDepartmentValidation } from './academic_department.validation'
const router = express.Router()
router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
)

router.get('/:id', AcademicDepartmentController.getSingleDepartment)

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
)

router.delete('/:id', AcademicDepartmentController.deleteDepartment)

router.get('/', AcademicDepartmentController.getAllDepartments)
const AcademicDepartmentRoute = router
export default AcademicDepartmentRoute
