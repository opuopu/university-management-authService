import { Response } from 'express'
type Iapiresponse<T> = {
  statusCode: number
  success: boolean
  meta?: {
    page?: number
    limit?: number
    total: number
  }
  message?: string | null
  data: T
}
const sendResponse = <T>(res: Response, data: Iapiresponse<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  })
}

export default sendResponse
