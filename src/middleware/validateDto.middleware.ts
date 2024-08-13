import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export function validateDto(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToClass(dtoClass, req.body)
    validate(dtoObj).then((errors) => {
      if (errors.length > 0) {
        const errorMessages = errors.map((error) => Object.values(error?.constraints ?? {})).flat()
        return res.status(400).json({ errors: errorMessages })
      } else {
        req.body = dtoObj
        next()
      }
    })
  }
}
