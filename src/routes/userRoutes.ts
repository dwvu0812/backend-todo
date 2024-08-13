import express, { RequestHandler } from 'express'
import { UserController } from '~/controllers'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '~/dtos/user.dto'
import { validateDto } from '~/middleware/validateDto.middleware'

export const createUserRoute = (userController: UserController, authMiddleware: RequestHandler) => {
  const router = express.Router()

  router.post('/register', validateDto(CreateUserDto), userController.register)
  router.post('/login', validateDto(LoginUserDto), userController.login)

  router.use(authMiddleware)

  router.get('/profile', userController.getProfile)
  router.put('/profile', validateDto(UpdateUserDto), userController.updateProfile)
  return router
}
