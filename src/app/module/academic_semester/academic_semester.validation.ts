import { z } from 'zod'
import {
  AcademicCodes,
  AcademicMonths,
  AcademicTitles,
} from './academic_semester.Constants'

const AcademicSemesterZodSchemas = z.object({
  body: z.object({
    title: z.enum([...AcademicTitles] as [string, ...string[]], {
      required_error: 'Title is Required',
    }),
    year: z.number({
      required_error: 'Year is Required',
    }),
    code: z.enum([...AcademicCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    starstartMontht: z.enum([...AcademicMonths] as [string, ...string[]], {
      required_error: 'month is required',
    }),
    endMonth: z.enum([...AcademicMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
})
export const AcademicSemestervalidation = {
  AcademicSemesterZodSchemas,
}
