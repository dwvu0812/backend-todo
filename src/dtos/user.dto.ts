import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string
}

export class LoginUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
