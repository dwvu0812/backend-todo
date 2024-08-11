export interface IUser {
  id: string // MongoDB ObjectId as string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export type CreateUserDTO = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUserDTO = Partial<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>

export interface UserListResponse {
  users: IUser[]
  total: number
  page: number
  limit: number
}
