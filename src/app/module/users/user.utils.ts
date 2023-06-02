import { user } from './user.model'

export const findLastuserId = async () => {
  const lastuser = await user
    .findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastuser?.id
}

export const incrementUserId = async () => {
  const currentid = (await findLastuserId()) || (0).toString().padStart(5, '0')
  const incrementuserid = parseInt(currentid) + 1
  return incrementuserid
}
