import express, { RequestHandler } from 'express'
import { UserController } from '~/controllers'

export const createUserRoute = (userController: UserController, authMiddleware: RequestHandler) => {
  const router = express.Router()

  router.post('/register', userController.register)
  router.post('/login', userController.login)

  router.use(authMiddleware)

  router.get('/profile', userController.getProfile)
  router.put('/profile', userController.updateProfile)
  return router
}
