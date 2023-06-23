import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import Apierror from '../../error/Apierror'
import { jwthelper } from '../../shared/jwthelper'

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new Apierror(httpStatus.UNAUTHORIZED, 'you are not authorized')
      }
      // verify token

      const verifyToken = jwthelper.verifyToken(
        token,
        config.jwt.secret as Secret
      )
      if (!verifyToken) {
        throw new Apierror(httpStatus.NOT_FOUND, 'invalid token')
      }
      req.user = verifyToken

      //  authorization
      if (requiredRole.length && !requiredRole.includes(verifyToken.role)) {
        throw new Apierror(
          httpStatus.FORBIDDEN,
          'authorization failed ! unauthorized user'
        )
      }

      return next()
    } catch (error) {
      next(error)
    }
  }

export default auth
