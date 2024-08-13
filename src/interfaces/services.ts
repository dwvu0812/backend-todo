import { CreateTaskDTO, ITask, UpdateTaskDTO } from './tasks'
import { CreateUserDTO, IUser, UpdateUserDTO } from './user'

export interface ITaskService {
  createTask(data: CreateTaskDTO): Promise<ITask>
  getTaskById(id: string): Promise<ITask | null>
  updateTask(id: string, data: UpdateTaskDTO): Promise<ITask>
  deleteTask(id: string): Promise<ITask>
  getTasks(userId: string, page: number, pageSize: number): Promise<{ tasks: ITask[]; total: number }>
}

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<IUser>
  validateUser(email: string, password: string): Promise<IUser>
  getUserById(id: string): Promise<IUser | null>
  getUserByEmail(email: string): Promise<IUser | null>
  updateUser(id: string, data: UpdateUserDTO): Promise<IUser>
  deleteUser(id: string): Promise<IUser>
  getUsers(page: number, pageSize: number): Promise<{ users: IUser[]; total: number }>
}
