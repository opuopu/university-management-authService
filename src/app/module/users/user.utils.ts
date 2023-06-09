import { IAcamadeciSemester } from '../academic_semester/academic_semester.interface'
import { user } from './user.model'

export const findLastStudentId = async () => {
  const lastStudent = await user
    .findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : null
}

// export const GenerateStudentId = async (
//   academicSemester: IAcamadeciSemester | null
// ) => {
//   const currentid = (await findLastStudentId()) || (0).toString()
//   const incrementStudentid = (parseInt(currentid) + 1)
//     .toString()
//     .padStart(5, '0')
//   const finalId = `${academicSemester?.year.substring(2)}${
//     academicSemester?.code
//   }${incrementStudentid}`
//   // console.log(finalId)
//   return finalId
// }
export const GenerateStudentId = async (
  academicSemester: IAcamadeciSemester | null
) => {
  console.log(academicSemester) // Add this line to check the value of academicSemester
  const currentid = (await findLastStudentId()) || (0).toString()
  const incrementStudentid = (parseInt(currentid) + 1)
    .toString()
    .padStart(5, '0')
  const finalId = `${academicSemester?.year?.substring(2)}${
    academicSemester?.code
  }${incrementStudentid}`
  console.log(finalId) // Add this line to check the generated finalId
  return finalId
}

// faculty
export const findLastFacultyId = async () => {
  const lastfaculty = await user
    .findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastfaculty?.id ? lastfaculty.id.substring(2) : null
}
export const generateFacultyId = async (): Promise<string> => {
  const currentid = (await findLastFacultyId()) || (0).toString()
  const incrementFacultyId = (parseInt(currentid) + 1)
    .toString()
    .padStart(5, '0')
  const finalId = `F-${incrementFacultyId}`

  return finalId
}
// admin
export const findLastAdminId = async () => {
  const lastfaculty = await user
    .findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastfaculty?.id ? lastfaculty.id.substring(2) : null
}
export const generateAdmintyId = async (): Promise<string> => {
  const currentid = (await findLastFacultyId()) || (0).toString()
  const incrementFacultyId = (parseInt(currentid) + 1)
    .toString()
    .padStart(5, '0')
  const finalId = `A-${incrementFacultyId}`

  return finalId
}
