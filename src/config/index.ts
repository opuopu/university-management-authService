import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL,
  redis_token_expires_in: process.env.REDIS_TOKEN_EXPIRESIN,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  redis_url: process.env.REDIS_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_In: process.env.JWT_REFRESH_EXPIRES_IN,
  },
}
