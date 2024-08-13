import { CreateTaskDto, UpdateTaskDto } from '~/dtos/task.dto'
import { ITask } from './tasks'
import { IUser } from './user'
import { CreateUserDto, UpdateUserDto } from '~/dtos/user.dto'

export interface ITaskService {
  createTask(data: CreateTaskDto): Promise<ITask>
  getTaskById(id: string): Promise<ITask | null>
  updateTask(id: string, data: UpdateTaskDto): Promise<ITask>
  deleteTask(id: string): Promise<ITask>
  getTasks(userId: string, page: number, pageSize: number): Promise<{ tasks: ITask[]; total: number }>
}

export interface IUserService {
  createUser(data: CreateUserDto): Promise<IUser>
  validateUser(email: string, password: string): Promise<IUser>
  getUserById(id: string): Promise<IUser | null>
  getUserByEmail(email: string): Promise<IUser | null>
  updateUser(id: string, data: UpdateUserDto): Promise<IUser>
  deleteUser(id: string): Promise<IUser>
  getUsers(page: number, pageSize: number): Promise<{ users: IUser[]; total: number }>
}
