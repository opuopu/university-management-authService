import { model, Schema } from 'mongoose'
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academic_faculty.interface'

const AcademicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)
const academicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'academicFaculty',
  AcademicFacultySchema
)
export default academicFaculty
