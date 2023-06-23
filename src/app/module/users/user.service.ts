import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config/index'
import Apierror from '../../../error/Apierror'
import { IFaculty } from '../Faculty/faculty.interface'
import { UserFaculty } from '../Faculty/faculty.model'
import AcamedicSemester from '../academic_semester/academic_semester.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { Iuser } from './user.interface'
import { user } from './user.model'
import {
  GenerateStudentId,
  generateAdmintyId,
  generateFacultyId,
} from './user.utils'

export const Create_Student = async (
  student: IStudent,
  users: Iuser
): Promise<Iuser | null> => {
  let newUserAllData = null
  if (!users.password) {
    users.password = config.default_student_password as string
  }
  // hash my password
  // users.password =  await bcrypt.hash(users.password,Number(config.bcrypt_salt_round))
  users.role = 'student'
  const academicsemester = await AcamedicSemester.findById(
    student.academicSemester
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await GenerateStudentId(academicsemester)
    users.id = id
    student.id = id
    const createdStudent = await Student.create([student], { session })
    if (!createdStudent.length) {
      throw new Apierror(httpStatus.BAD_REQUEST, 'failed to create student')
    }
    // set student _id into user.student
    users.student = createdStudent[0]._id
    const createAuser = await user.create([users], { session })
    if (!createAuser.length) {
      throw new Apierror(httpStatus.BAD_REQUEST, 'user not created')
    }
    newUserAllData = createAuser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await user.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

// faculty
export const Create_Faculty = async (
  faculty: IFaculty,
  users: Iuser
): Promise<Iuser | null> => {
  if (!users.password) {
    users.password = config.default_faculty_password as string
  }
  users.role = 'faculty'

  // start session
  const session = await mongoose.startSession()

  let newuserAlldata = null
  try {
    session.startTransaction()
    const id = await generateFacultyId()
    users.id = id
    faculty.id = id
    const createFaculty = await UserFaculty.create([faculty], { session })
    if (!createFaculty.length) {
      throw new Apierror(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }
    users.faculty = createFaculty[0]._id
    const newuser = await user.create([users], { session })
    newuserAlldata = newuser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newuserAlldata) {
    newuserAlldata = await user.findOne({ id: newuserAlldata.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newuserAlldata
}

// admin
export const create_Admin = async (
  admin: IAdmin,
  users: Iuser
): Promise<Iuser | null> => {
  // default password
  if (!users.password) {
    users.password = config.default_admin_password as string
  }

  // set role
  users.role = 'admin'

  // generate faculty id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateAdmintyId()
    users.id = id
    admin.id = id

    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new Apierror(httpStatus.BAD_REQUEST, 'Failed to create faculty ')
    }

    users.admin = newAdmin[0]._id

    const newUser = await user.create([user], { session })

    if (!newUser.length) {
      throw new Apierror(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await user.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  return newUserAllData
}
