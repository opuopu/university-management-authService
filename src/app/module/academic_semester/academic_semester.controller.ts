import { NextFunction, Request, Response } from 'express'
import { createsemester } from './academic_semester.service'
export const createAcademicSemesterM = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const result = await createsemester(req.body)
    res.status(200).send(result)
  } catch (error) {
    next(error)
  }
}
