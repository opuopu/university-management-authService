import express from 'express'
import { semesterRoutes } from '../module/academic_semester/academic.semester.route'
import { router as userRoutes } from '../module/users/user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: semesterRoutes,
  },
]

moduleRoutes.forEach(r => {
  router.use(r.path, r.route)
})
// router.use('/users',userRoutes)
// router.use('/academic-semester',semesterRoutes)

export default router
