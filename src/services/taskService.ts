import { CreateTaskDTO, ITask, ITaskRepository, UpdateTaskDTO } from '~/interfaces'

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async createTask(data: CreateTaskDTO): Promise<ITask> {
    return this.taskRepository.create(data)
  }

  async findTaskById(id: string): Promise<ITask | null> {
    return this.taskRepository.findById(id)
  }

  async updateTask(id: string, data: UpdateTaskDTO): Promise<ITask> {
    return this.taskRepository.update(id, data)
  }

  async deleteTask(id: string): Promise<ITask> {
    return this.taskRepository.delete(id)
  }

  async getTasks(userId: string, page: number, pageSize: number): Promise<{ tasks: ITask[]; total: number }> {
    const limit = pageSize
    const skip = (page - 1) * pageSize
    return this.taskRepository.findAll(userId, skip, limit)
  }
}
