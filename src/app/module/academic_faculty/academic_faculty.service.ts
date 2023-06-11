import { IAcademicFaculty } from './academic_faculty.interface'
import AcamedicFaculty from './academic_faculty.model'
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcamedicFaculty.create(payload)
  return result
}

const AcademicFacultyServices = {
  createFaculty,
}
export default AcademicFacultyServices
