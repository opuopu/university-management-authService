import { IGenericErrorMessage } from './error'
export type IgenericErrorResponse = {
  statusCode: number
  message: string
  errormessages: IGenericErrorMessage[]
}
