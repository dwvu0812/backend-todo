import { CreateTaskDTO } from '~/interfaces'

class TodoService {
  async createTask(taskData: CreateTaskDTO) {
    // Logic để tạo task
  }

  async getTasks(page: number, limit: number) {
    // Logic để lấy danh sách task với phân trang
  }
}

export default new TodoService()
