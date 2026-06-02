import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

export class LoginInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  user: Omit<User, 'password'>;
}
