import { RequestHandler } from 'express'
import { createUser } from './user.service'

export const createUsers: RequestHandler = async (req, res, next) => {
  try {
    const userdata = req.body
    const result = await createUser(userdata)
    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}
