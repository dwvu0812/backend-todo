import { CreateTaskDTO, ITask, UpdateTaskDTO } from './tasks'
import { CreateUserDTO, IUser, UpdateUserDTO } from './user'

export interface ITaskRepository {
  create(data: CreateTaskDTO): Promise<ITask>
  findById(id: string): Promise<ITask | null>
  update(id: string, data: UpdateTaskDTO): Promise<ITask>
  delete: (id: string) => Promise<ITask>
  findAll: (
    userId: string,
    limit: number,
    skip: number
  ) => Promise<{
    tasks: ITask[]
    total: number
  }>
}

export interface IUserRepository {
  findById: (id: string) => Promise<IUser | null>
  findByEmail: (email: string) => Promise<IUser | null>
  create: (data: CreateUserDTO) => Promise<IUser>
  update: (id: string, data: UpdateUserDTO) => Promise<IUser>
  delete: (id: string) => Promise<IUser>
  findAll: (
    limit: number,
    skip: number
  ) => Promise<{
    users: IUser[]
    total: number
  }>
}
