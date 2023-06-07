import status from 'http-status'
import { Schema, model } from 'mongoose'
import Apierror from '../../../error/Apierror'
import { AcademicMonths } from './academic_semester.Constants'
import {
  IAcademicSemesterModel,
  IAcamadeciSemester,
} from './academic_semester.interface'

const AcademicSemesterSchema = new Schema<IAcamadeciSemester>({
  title: { required: true, type: String, enum: ['Autumn', 'Summer', 'Fall'] },
  year: { required: true, type: Number },
  code: {
    required: true,
    type: String,

    enum: ['01', '02', '03'],
  },
  startMonth: { required: true, type: String, enum: AcademicMonths },
  endMonth: { required: true, type: String, enum: AcademicMonths },
})
// pre hook
AcademicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcamedicSemester.aggregate([
    {
      $match: {
        $and: [{ title: this.title }, { year: this.year }],
      },
    },
  ])
  if (isExist.length > 0) {
    throw new Apierror(status.CONFLICT, 'academic semester is  already exists')
  } else {
    next()
  }
})

const AcamedicSemester = model<IAcamadeciSemester, IAcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
)

export default AcamedicSemester
