import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { statusEnum } from '../entities/statusEnum';
import { AddTodoDto } from './add-todo.dto';

export class UpdateTodoDto  {
  @IsOptional()
  @IsEnum(statusEnum)
  status?: statusEnum;
  @IsOptional()  
  @MinLength(3)
  @MaxLength(10)
  name: string;
  @IsOptional()  @IsString()
  @MaxLength(10)
  description: string;
}