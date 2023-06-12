import { IAcamadeciSemester } from '../academic_semester/academic_semester.interface'
import { user } from './user.model'

export const findLastStudentId = async () => {
  const lastuser = await user
    .findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastuser?.id
}

export const GenerateStudentId = async (
  academicSemester: IAcamadeciSemester
) => {
  const currentid = (await findLastStudentId()) || (0).toString()
  const incrementStudentid = (parseInt(currentid) + 1)
    .toString()
    .padStart(5, '0')
  const finalId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementStudentid}`
  console.log(finalId)
  return finalId
}
