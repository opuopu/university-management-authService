import config from '../../../config/index'
import { Iuser } from './user.interface'
import { user } from './user.model'
import { generateFacultyId } from './user.utils'
export const createUser = async (users: Iuser): Promise<Iuser | null> => {
  const id = await generateFacultyId()
  console.log(id)
  users.id = id

  if (!users.password) {
    users.password = config.default_user_password as string
  }

  const createAuser = await user.create(users)
  if (!createAuser) {
    throw new Error('user not created')
  }
  return createAuser
}
