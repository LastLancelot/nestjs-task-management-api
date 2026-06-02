import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './public.declaration';
import { validate } from 'class-validator';
import { CreateUserInput } from '../user/dto/user.dto';
import { LoginInput, LoginResponse } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login as user' })
  @ApiCreatedResponse({
    description: 'Logging successfilly complite',
    type: LoginResponse,
  })
  @ApiBody({ type: LoginInput })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @HttpCode(200)
  async signIn(@Body() signInDto: LoginInput) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User has been successfully created' })
  @ApiBody({ type: CreateUserInput })
  @Public()
  @Post('signUp')
  @HttpCode(204)
  async signUp(@Body() createUserDto: CreateUserInput) {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return await this.authService.signUp(createUserDto);
  }
}
