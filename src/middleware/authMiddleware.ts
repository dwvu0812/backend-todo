import { NextFunction, Request, Response } from 'express'
import { IUserService } from '~/interfaces'
import jwt from 'jsonwebtoken'

export const createAuthMiddleware = (userService: IUserService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is required' })
      }

      const token = authHeader.split(' ')[1]

      if (!token) {
        return res.status(401).json({ message: 'Token is required' })
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
      const user = await userService.getUserById(decoded.userId)

      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }
      // @ts-ignore
      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}
