import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ErrorsEnum } from 'src/enums/ErrorsEnum';

export class AddTodoDto {
  @IsNotEmpty({ message: ErrorsEnum.REQUIRED_FIELD })
  @MinLength(3)
  @MaxLength(10)
  name: string;
  @IsNotEmpty({ message: ErrorsEnum.REQUIRED_FIELD })
  @IsString()
  @MaxLength(10)
  description: string;
}