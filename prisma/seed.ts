import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('password123', 10)

  // Tạo một user
  const user = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'john@example.com',
      password: password
    }
  })

  // Tạo một số tasks cho user này
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Học Prisma',
        description: 'Tìm hiểu về Prisma ORM',
        status: 'TODO',
        userId: user.id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Mua sắm',
        description: 'Mua rau và trái cây',
        status: 'IN_PROGRESS',
        userId: user.id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Tập thể dục',
        description: 'Chạy bộ 30 phút',
        status: 'DONE',
        userId: user.id
      }
    })
  ])

  console.log({ user, tasks })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
