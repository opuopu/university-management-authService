import { Month, code, title } from './academic_semester.interface'

export const AcademicMonths: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const AcademicCodes: code[] = ['01', '02', '03']

export const AcademicTitles: title[] = ['Autumn', 'Fall', 'Summer']
export const academicsemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
