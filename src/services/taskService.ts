import { CreateTaskDto, UpdateTaskDto } from '~/dtos/task.dto'
import { ITask, ITaskRepository, ITaskService, TaskStatus } from '~/interfaces'

export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async createTask(data: CreateTaskDto): Promise<ITask> {
    if (!data.title) {
      throw new Error('Title is required')
    }

    if (!data.status) {
      data.status = TaskStatus.TODO
    }

    return this.taskRepository.create(data)
  }

  async getTaskById(id: string): Promise<ITask | null> {
    const task = await this.taskRepository.findById(id)
    if (!task) {
      throw new Error('Task not found')
    }
    return task
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<ITask> {
    const existingTask = await this.taskRepository.findById(id)

    if (!existingTask) {
      throw new Error('Task not found')
    }

    if (data.status && !Object.values(TaskStatus).includes(data.status)) {
      throw new Error('Invalid status')
    }

    return this.taskRepository.update(id, data)
  }

  async deleteTask(id: string): Promise<ITask> {
    const existingTask = await this.taskRepository.findById(id)
    if (!existingTask) {
      throw new Error('Task not found')
    }
    return this.taskRepository.delete(id)
  }

  async getTasks(userId: string, page: number, pageSize: number): Promise<{ tasks: ITask[]; total: number }> {
    if (page < 1) {
      throw new Error('Invalid page')
    }

    if (pageSize < 1 || pageSize > 100) {
      throw new Error('Invalid page size')
    }

    const limit = pageSize
    const skip = (page - 1) * pageSize
    return this.taskRepository.findAll(userId, skip, limit)
  }
}
