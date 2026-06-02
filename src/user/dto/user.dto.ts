import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserInput {
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastname: string;
}
