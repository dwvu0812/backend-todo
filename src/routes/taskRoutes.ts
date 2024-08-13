import express, { RequestHandler } from 'express'
import TaskController from '~/controllers/taskController'
import { CreateTaskDto, UpdateTaskDto } from '~/dtos/task.dto'
import { validateDto } from '~/middleware/validateDto.middleware'

export const createTaskRoute = (taskController: TaskController, authMiddleware: RequestHandler) => {
  const router = express.Router()
  router.use(authMiddleware)

  router.post('/', validateDto(CreateTaskDto), taskController.createTask)
  router.get('/', taskController.getTasks)
  router.get('/:id', taskController.getTask)
  router.put('/:id', validateDto(UpdateTaskDto), taskController.updateTask)
  router.delete('/:id', taskController.deleteTask)

  return router
}
