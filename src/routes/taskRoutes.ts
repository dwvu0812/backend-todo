import express, { RequestHandler } from 'express'
import TaskController from '~/controllers/taskController'

export const createTaskRoute = (taskController: TaskController, authMiddleware: RequestHandler) => {
  const router = express.Router()
  router.use(authMiddleware)

  router.post('/', taskController.createTask)
  router.get('/', taskController.getTasks)
  router.get('/:id', taskController.getTask)
  router.put('/:id', taskController.updateTask)
  router.delete('/:id', taskController.deleteTask)

  return router
}
