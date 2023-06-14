import express from 'express'
import AcademicDepartmentRoute from '../module/academic_department/academic_department.route'
import { FacultyRoute } from '../module/academic_faculty/academic_faculty.route'
import { semesterRoutes } from '../module/academic_semester/academic.semester.route'
import { StudentRoutes } from '../module/student/student.route'
import { router as usersRoutes } from '../module/users/user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
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
]

moduleRoutes.forEach(r => {
  router.use(r.path, r.route)
})
// router.use('/users',userRoutes)
// router.use('/academic-semester',semesterRoutes)

export default router
