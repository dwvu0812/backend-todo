import { CreateTaskDto, UpdateTaskDto } from '~/dtos/task.dto'
import { ITask, ITaskRepository, TaskStatus } from '~/interfaces'
import prisma from '~/lib/prisma'

class TaskRepository implements ITaskRepository {
  async create(task: CreateTaskDto): Promise<ITask> {
    // @ts-ignore
    return prisma.task.create({
      data: {
        ...task,
        status: task.status || TaskStatus.TODO
      }
    })
  }

  async findById(id: string): Promise<ITask | null> {
    // @ts-ignore
    return prisma.task.findUnique({
      where: { id }
    })
  }

  async update(id: string, task: UpdateTaskDto): Promise<ITask> {
    // @ts-ignore
    return prisma.task.update({
      where: { id },
      data: task
    })
  }

  async delete(id: string): Promise<ITask> {
    // @ts-ignore
    return prisma.task.delete({
      where: { id }
    })
  }

  async findAll(userId: string, page: number, limit: number): Promise<{ tasks: ITask[]; total: number }> {
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.task.count({ where: { userId } })
    ])
    // @ts-ignore
    return { tasks, total }
  }
}

export default new TaskRepository()
