import { CreateTaskDto, UpdateTaskDto } from '~/dtos/task.dto'
import { ITask } from './tasks'
import { IUser } from './user'
import { CreateUserDto, UpdateUserDto } from '~/dtos/user.dto'

export interface ITaskRepository {
  create(data: CreateTaskDto): Promise<ITask>
  findById(id: string): Promise<ITask | null>
  update(id: string, data: UpdateTaskDto): Promise<ITask>
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
  create: (data: CreateUserDto) => Promise<IUser>
  update: (id: string, data: UpdateUserDto) => Promise<IUser>
  delete: (id: string) => Promise<IUser>
  findAll: (
    limit: number,
    skip: number
  ) => Promise<{
    users: IUser[]
    total: number
  }>
}
