import { CreateUserDTO, IUser } from '~/interfaces'
import { UserRepository } from '~/repositories'

export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(data: CreateUserDTO): Promise<IUser> {
    return this.userRepository.create(data)
  }
  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id)
  }
  async getUserByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findByEmail(email)
  }
  async updateUser(id: string, data: CreateUserDTO): Promise<IUser> {
    return this.userRepository.update(id, data)
  }
  async deleteUser(id: string): Promise<IUser> {
    return this.userRepository.delete(id)
  }
  async getUsers(page: number, pageSize: number): Promise<{ users: IUser[]; total: number }> {
    const limit = pageSize
    const skip = (page - 1) * pageSize
    return this.userRepository.findAll(skip, limit)
  }
}
