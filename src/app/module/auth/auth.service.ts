import httpStatus from 'http-status'
import Apierror from '../../../error/Apierror'

import { user } from '../users/user.model'
import { ILoginUser } from './auth.interface'

const loginuser = async (payload: ILoginUser) => {
  const { id, password } = payload
  //   createing instance of user
  const users = new user()
  const isuserExist = await users.isUserExist(id)
  if (!isuserExist) {
    throw new Apierror(404, 'user not found')
  }
  const ispasswordMatched = users.isPassWordMatched(
    password,
    isuserExist.password
  )

  if (!ispasswordMatched) {
    throw new Apierror(httpStatus.UNAUTHORIZED, 'password is incorrect')
  }

  // if ispasswordmatched then create jwt token
}

const Authservice = {
  loginuser,
}
export default Authservice
