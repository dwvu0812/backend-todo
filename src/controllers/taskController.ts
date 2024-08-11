import { Request, Response } from 'express'
import { CreateTaskDTO, UpdateTaskDTO } from '~/interfaces'
import taskRepository from '~/repositories/taskRepository'
import { TaskService } from '~/services'

const taskService = new TaskService(taskRepository)

class TaskController {
  constructor(private taskService: TaskService) {}

  async createTask(req: Request, res: Response) {
    const data: CreateTaskDTO = req.body
    const task = await this.taskService.createTask(data)
    res.json(task)
  }

  async getTask(req: Request, res: Response) {
    const id = req.params.id
    const task = await this.taskService.findTaskById(id)
    res.json(task)
  }

  async updateTask(req: Request, res: Response) {
    const id = req.params.id
    const data: UpdateTaskDTO = req.body
    const task = await this.taskService.updateTask(id, data)
    res.json(task)
  }

  async deleteTask(req: Request, res: Response) {
    const id = req.params.id
    const task = await this.taskService.deleteTask(id)
    res.json(task)
  }

  async getTasks(req: Request, res: Response) {
    const userId = req.user.id
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const { tasks, total } = await this.taskService.getTasks(userId, page, pageSize)
    res.json({ tasks, total })
  }
}

const taskController = new TaskController(taskService)

export default taskController
