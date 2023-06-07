import { Model } from 'mongoose'
export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type title = 'Autumn' | 'Summer' | 'Fall'
export type code = '01' | '02' | '03'
export type IAcamadeciSemester = {
  title: title
  year: number
  code: code
  startMonth: Month
  endMonth: Month
}

export type IAcademicSemesterModel = Model<IAcamadeciSemester, object>
