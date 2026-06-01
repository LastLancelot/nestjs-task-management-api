import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isComplite: boolean;

  @IsEmpty()
  ownerId: number;
}
