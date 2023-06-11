import { z } from 'zod'
import {
  AcademicCodes,
  AcademicMonths,
  AcademicTitles,
} from './academic_semester.Constants'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
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

const UpdateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z.enum([...AcademicCodes] as [string, ...string[]]).optional(),
      startMonth: z
        .enum([...AcademicMonths] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicMonths] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'something went wrong',
    }
  )

const AcademicZodvaliDation = {
  createAcademicSemesterZodSchema,
  UpdateAcademicSemesterZodSchema,
}
export default AcademicZodvaliDation
