export const AcademicSemesterSearchAbleFields = ['title', 'code', 'startMonth', 'endMonth'];

export const AcademicSemesterFilterAbleFileds = ['searchTerm', 'code', 'startMonth', 'endMonth'];
export const AcademicCodes: string[] = ['01', '02', '03']

export const AcademicTitles: string[] = ['Autumn', 'Fall', 'Summer']
export const academicsemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
export const eventForAcademicSemester =[
  'academic_semester_created',
  'academic_semester_updated'
]