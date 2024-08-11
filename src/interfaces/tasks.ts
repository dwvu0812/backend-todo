export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface ITask {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
  dueDate: Date | null
  userId: string
}

export type CreateTaskDTO = Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateTaskDTO = Partial<Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>>

export interface TaskListResponse {
  task: ITask[]
  total: number
  page: number
  limit: number
}
