import httpStatus from 'http-status'
import Apierror from '../../../error/Apierror'
import { academicsemesterTitleCodeMapper } from './academic_semester.Constants'
import { IAcamadeciSemester } from './academic_semester.interface'
import AcamedicSemester from './academic_semester.model'

export const createsemester = async (
  payload: IAcamadeciSemester
): Promise<IAcamadeciSemester> => {
  if (academicsemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'invalid semester code')
  }

  const semesterdata = await AcamedicSemester.create(payload)

  return semesterdata
}
