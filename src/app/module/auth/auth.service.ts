/* eslint-disable no-console */
import httpStatus from 'http-status'
import Apierror from '../../../error/Apierror'

import bcrypt from 'bcrypt'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwthelper } from '../../../shared/jwthelper'
import { user } from '../users/user.model'
import { IChangePassword, ILoginUser } from './auth.interface'
const loginuser = async (payload: ILoginUser) => {
  const { id, password } = payload
  //   createing instance of user
  const users = new user()
  const isuserExist = await users.isUserExist(id)
  if (!isuserExist) {
    throw new Apierror(404, 'user not found')
  }
  const { needPasswordChange } = isuserExist
  const ispasswordMatched = users.isPassWordMatched(
    password,
    isuserExist.password
  )

  if (!ispasswordMatched) {
    throw new Apierror(httpStatus.UNAUTHORIZED, 'password is incorrect')
  }

  const accessToken = jwthelper.createToken(
    { id: isuserExist.id, role: isuserExist.role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.jwt_expires_in,
    }
  )

  const refreshToken = jwthelper.createToken(
    { id: isuserExist.id, role: isuserExist.role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.jwt_expires_in,
    }
  )

  console.log({ accessToken, refreshToken, isuserExist, needPasswordChange })

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  }
}

// refresh token
const refreshToken = async (token: string) => {
  //  step 1:-verify token
  let verifyToken = null
  try {
    verifyToken = jwthelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new Apierror(404, 'invalid token')
  }
  //   step 2 cheek user exists in our database or not
  const { id } = verifyToken
  const users = new user()

  const isUserExist = await users.isUserExist(id)
  if (!isUserExist) {
    throw new Apierror(httpStatus.NOT_FOUND, 'user does not exist')
  }
  //  steps 3  generate new token
  const newaccessToken = jwthelper.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.jwt_expires_in,
    }
  )
  return {
    newaccessToken,
  }
}

// change password

const changepassword = async (
  passwordData: IChangePassword,
  userdata: JwtPayload
): Promise<void> => {
  const { oldPassword, newPassword } = passwordData
  const users = new user()
  const isuserExist = await users.isUserExist(userdata.id)
  if (!isuserExist) {
    throw new Apierror(httpStatus.NOT_FOUND, 'user not found')
  }
  if (
    isuserExist.password &&
    !(await users.isPassWordMatched(oldPassword, isuserExist.password))
  ) {
    throw new Apierror(httpStatus.UNAUTHORIZED, 'password did not matched')
  }

  // hash password before saving
  const newhasPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  )
  // update password
  await user.findOneAndUpdate(
    { id: userdata.id },
    {
      password: newhasPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  )
}
const Authservice = {
  loginuser,
  refreshToken,
  changepassword,
}
export default Authservice
