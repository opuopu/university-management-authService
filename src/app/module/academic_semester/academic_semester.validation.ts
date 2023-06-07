import { z } from 'zod'
import {
  AcademicCodes,
  AcademicMonths,
  AcademicTitles,
} from './academic_semester.Constants'

const AcademicSemesterZodSchemas = z.object({
  body: z.object({
    title: z.enum([...AcademicTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required ',
    }),
    code: z.enum([...AcademicCodes] as [string, ...string[]]),
    startMonth: z.enum([...AcademicMonths] as [string, ...string[]], {
      required_error: 'Start month is needed',
    }),
    endMonth: z.enum([...AcademicMonths] as [string, ...string[]], {
      required_error: 'End month is needed',
    }),
  }),
})
export default AcademicSemesterZodSchemas
