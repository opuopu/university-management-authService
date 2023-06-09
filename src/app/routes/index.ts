import express from 'express'
import AcademicDepartmentRoute from '../module/academic_department/academic_department.route'
import { FacultyRoute } from '../module/academic_faculty/academic_faculty.route'
import { semesterRoutes } from '../module/academic_semester/academic.semester.route'
import { AdminRoutes } from '../module/admin/admin.route'
import authRoute from '../module/auth/auth.route'
import { ManagementDepartmentRoutes } from '../module/managementDepartment/managementDepartment.route'
import { StudentRoutes } from '../module/student/student.route'
import { router as usersRoutes } from '../module/users/user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/create-student',
    route: usersRoutes,
  },
  {
    path: '/academic-semesters',
    route: semesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: FacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/faculty',
    route: usersRoutes,
  },
  {
    path: '/create-faculty',
    route: usersRoutes,
  },
  {
    path: '/managementDepartment',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/create-admin',
    route: usersRoutes,
  },
  {
    path: '/auth',
    route: authRoute,
  },
]

moduleRoutes.forEach(r => {
  router.use(r.path, r.route)
})
// router.use('/users',userRoutes)
// router.use('/academic-semester',semesterRoutes)

export default router
