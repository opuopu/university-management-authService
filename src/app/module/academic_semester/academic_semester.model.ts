import { Schema, model } from 'mongoose'
import { months } from './academic_semester.Constants'
import {
  IAcademicSemesterModel,
  IAcamadeciSemester,
} from './academic_semester.interface'

const AcademicSemesterSchema = new Schema<IAcamadeciSemester>(
  {
    title: { required: true, type: String, enum: ['Autumn', 'Summer', 'Fall'] },
    year: { required: true, type: Number },
    code: {
      required: true,
      type: String,
      unique: true,
      enum: ['01', '02', '03'],
    },
    startMonth: { required: true, type: String, enum: months },
    endMonth: { required: true, type: String, enum: months },
  },
  {
    timestamps: true,
  }
)
const AcamedicSemester = model<IAcamadeciSemester, IAcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
)
export default AcamedicSemester
