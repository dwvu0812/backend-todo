import { IUser, IUserRepository, IUserService } from '~/interfaces'
import bcrypt from 'bcrypt'
import { CreateUserDto, UpdateUserDto } from '~/dtos/user.dto'

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}
  async createUser(data: CreateUserDto): Promise<IUser> {
    if (!data.email || !data.password) {
      throw new Error('Email and password are required')
    }

    const existingUser = await this.userRepository.findByEmail(data.email)

    if (existingUser) {
      throw new Error('Email already existed')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    return this.userRepository.create({
      ...data,
      password: hashedPassword
    })
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    return user
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return this.userRepository.findById(id)
  }
  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }
    return this.userRepository.findByEmail(email)
  }
  async updateUser(id: string, data: UpdateUserDto): Promise<IUser> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    return this.userRepository.update(id, data)
  }
  async deleteUser(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return this.userRepository.delete(id)
  }
  async getUsers(page: number, pageSize: number): Promise<{ users: IUser[]; total: number }> {
    if (page < 1) {
      throw new Error('Page must be greater than 0')
    }

    if (pageSize < 1 || pageSize > 100) {
      throw new Error('Page size must be between 1 and 100')
    }
    const limit = pageSize
    const skip = (page - 1) * pageSize
    return this.userRepository.findAll(skip, limit)
  }
}
