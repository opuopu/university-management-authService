export type ILoginUser = {
  id: string
  password: string
}
export type IChangePassword = {
  oldPassword: string
  newPassword: string
}

export type resultResponse = {
  accessToken: string
  refreshToken?: string
  needPasswordChange: true | false
}
