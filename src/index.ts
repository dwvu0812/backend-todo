import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import { errorHandler } from './middleware/errorHandler'
import taskRepository from './repositories/taskRepository'
import userRepository from './repositories/userRepository'
import { TaskService, UserService } from './services'
import TaskController from './controllers/taskController'
import { UserController } from './controllers'
import { createAuthMiddleware } from './middleware/authMiddleware'
import { createTaskRoute, createUserRoute } from './routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Dependencies
const taskService = new TaskService(taskRepository)
const userService = new UserService(userRepository)
const taskController = new TaskController(taskService)
const userController = new UserController(userService)

// auth middleware
const authMiddleware = createAuthMiddleware(userService)
// Base route
app.use('/api/users', createUserRoute(userController, authMiddleware))
app.use('/api/tasks', createTaskRoute(taskController, authMiddleware))

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send('404 - Not Found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app
