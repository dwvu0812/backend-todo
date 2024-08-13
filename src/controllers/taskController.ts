import { Request, Response } from 'express'
import { CreateTaskDto, UpdateTaskDto } from '~/dtos/task.dto'
import { ITaskService } from '~/interfaces'

class TaskController {
  constructor(private taskService: ITaskService) {}

  async createTask(req: Request, res: Response) {
    try {
      const data: CreateTaskDto = req.body
      const task = await this.taskService.createTask({
        ...data,
        // @ts-ignore
        userId: req.user.id
      })
      res.status(201).json(task)
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }

  getTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.getTaskById(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }

  updateTask = async (req: Request, res: Response) => {
    try {
      const data: UpdateTaskDto = req.body
      const task = await this.taskService.updateTask(req.params.id, data)
      res.status(200).json(task)
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }

  deleteTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.deleteTask(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }

  getTasks = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.pageSize as string) || 10
      // @ts-ignore
      const { tasks, total } = await this.taskService.getTasks(req.user.id, page, pageSize)
      res.status(200).json({ tasks, total, page, pageSize })
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }
}

export default TaskController
