import { CreateUserDTO, IUserService, UpdateUserDTO } from '~/interfaces'
import { generateToken } from '~/utils/jwt'
import { Request, Response } from 'express'

export class UserController {
  constructor(private userService: IUserService) {}

  register = async (req: Request, res: Response) => {
    console.log('register', req)
    try {
      const user = await this.userService.createUser(req.body as unknown as CreateUserDTO)
      const token = generateToken(user)
      res.status(201).json({ user, token })
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const user = await this.userService.validateUser(email, password)
      const token = generateToken(user)
      res.status(200).json({ user, token })
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }

  getProfile = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user.id
      const user = await this.userService.getUserById(userId)
      res.status(200).json(user)
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }

  updateProfile = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user.id
      const user = await this.userService.updateUser(userId, req.body as UpdateUserDTO)
      res.status(200).json(user)
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message })
    }
  }
}
