import { CreateUserDTO, IUser } from '~/interfaces/user'
import prisma from '~/lib/prisma'

export class UserRepository {
  async create(data: CreateUserDTO): Promise<IUser> {
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

  async update(id: string, data: CreateUserDTO): Promise<IUser> {
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
