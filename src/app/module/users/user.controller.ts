import { RequestHandler } from 'express'
import { createUser } from './user.service'

export const createUsers: RequestHandler = async (req, res, next) => {
  try {
    // await userSchema.parseAsync(req)
    const userdata = req.body

    const result = await createUser(userdata)
    res.status(200).send(result)
  } catch (error) {
    next(error)
  }
}
