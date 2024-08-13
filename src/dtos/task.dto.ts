import { IsDateString, IsEnum, IsOptional, IsString, MinLength } from 'class-validator'
import { TaskStatus } from '~/interfaces'

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsEnum(TaskStatus)
  status: TaskStatus

  @IsOptional()
  @IsDateString()
  dueDate?: Date
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsOptional()
  @IsDateString()
  dueDate?: Date
}
