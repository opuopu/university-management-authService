import config from '../../../config/index'
import { Iuser } from './user.interface'
import { user } from './user.model'
import { incrementUserId } from './user.utils'
export const createUser = async (users: Iuser): Promise<Iuser | null> => {
  const id = await incrementUserId()
  users.id = id.toString().padStart(5, '0')
  const createAuser = await user.create(users)
  if (!users.password) {
    users.password = config.default_user_password as string
  }
  if (!createAuser) {
    throw new Error('user not created')
  }
  return createAuser
}
