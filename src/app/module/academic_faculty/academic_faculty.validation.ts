import { z } from 'zod'

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
})

const updatefacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
})

const AcademicFacultyZodValidation = {
  createAcademicFacultyZodSchema,
  updatefacultyZodSchema,
}
export default AcademicFacultyZodValidation
