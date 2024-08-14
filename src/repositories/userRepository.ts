import { CreateUserDto, UpdateUserDto } from '~/dtos/user.dto'
import { IUserRepository } from '~/interfaces'
import { IUser } from '~/interfaces/user'
import prisma from '~/lib/prisma'

class UserRepository implements IUserRepository {
  async create(data: CreateUserDto): Promise<IUser> {
    return prisma.user.create({
      data
    })
  }

  async findById(id: string): Promise<IUser> {
    // @ts-ignore
    return prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<IUser> {
    // @ts-ignore
    return prisma.user.findUnique({
      where: { email }
    })
  }

  async update(id: string, data: UpdateUserDto): Promise<IUser> {
    return prisma.user.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<IUser> {
    return prisma.user.delete({
      where: { id }
    })
  }

  async findAll(
    skip: number,
    take: number
  ): Promise<{
    users: IUser[]
    total: number
  }> {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take
      }),
      prisma.user.count()
    ])
    return { users, total }
  }
}

export default new UserRepository()
