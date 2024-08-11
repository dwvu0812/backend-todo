import { CreateUserDTO, IUser } from '~/interfaces'
import { UserRepository } from '~/repositories'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
  constructor(private userRepository: UserRepository) {}
  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d'
    })
    return { user, token }
  }

  //   async register(data: CreateUserDTO): Promise<{ user: IUser; token: string }> {
  //     const existingUser = await this.userRepository.findByEmail(data.email)

  //     if (existingUser) {
  //       throw new Error('Email already existed')
  //     }

  //     const hashedPassword = await bcrypt.hash(data.password, 10)

  //     const user = await this.userRepository.create({
  //       ...data,
  //       password: hashedPassword
  //     })

  //     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
  //       expiresIn: '1d'
  //     })

  //     return { user, token }
  //   }

  verifyToken(token: string): { userId: string } {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      return decoded as { userId: string }
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
