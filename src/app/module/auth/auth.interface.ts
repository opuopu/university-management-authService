export type ILoginUser = {
  id: string
  password: string
}

export type resultResponse = {
  accessToken: string
  refreshToken?: string
  needPasswordChange: true | false
}
