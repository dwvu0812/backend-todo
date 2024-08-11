import { Request, Response } from 'express'
import { CreateTaskDTO, UpdateTaskDTO } from '~/interfaces'

class TodoController {
  async createTask(req: Request, res: Response) {
    const taskData: CreateTaskDTO = req.body
    // Logic để xử lý yêu cầu tạo task
  }

  async updateTask(req: Request, res: Response) {
    const taskId: string = req.params.id
    const updateData: UpdateTaskDTO = req.body
    // Logic để xử lý yêu cầu cập nhật task
  }
}

export default new TodoController()
