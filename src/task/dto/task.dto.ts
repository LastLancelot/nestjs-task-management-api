import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
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
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  isComplite: boolean;

  @IsEmpty()
  ownerId: number;
}
