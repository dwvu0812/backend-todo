import jwt from 'jsonwebtoken'
import { IUser } from '~/interfaces'

export const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d'
  })
}
