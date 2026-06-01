import Joi from 'joi';
import { User } from './user.entity';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class userCreateDto {
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastname: string;
}
