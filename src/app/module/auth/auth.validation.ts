import { z } from 'zod'
const createAuthLoginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh token is required',
    }),
  }),
})
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old password is required',
    }),
    newPassword: z.string({
      required_error: 'new password is required',
    }),
  }),
})
const authzodSchema = {
  createAuthLoginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
}
export default authzodSchema
