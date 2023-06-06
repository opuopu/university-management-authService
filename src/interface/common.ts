export type IgenericErrorResponse = {
  statusCode: number
  message: string
  errormessages: {
    path: string
    message: string
  }[]
}
