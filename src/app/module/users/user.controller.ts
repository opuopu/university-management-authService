import { Request, Response } from 'express'
import { createUser } from './user.service'

export const createUsers = async (req: Request, res: Response) => {
  try {
    const userdata = req.body
    const result = await createUser(userdata)
    res.status(200).send(result)
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    })
  }
}
