export interface IUser {
  id: string // MongoDB ObjectId as string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
export interface UserListResponse {
  users: IUser[]
  total: number
  page: number
  limit: number
}
