import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Public } from './public.declaration';
import { validate } from 'class-validator';
import { userCreateDto } from 'src/user/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login as user' })
  @ApiCreatedResponse({ description: 'Logging successfilly complite' })
  @ApiBody({ type: User })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @HttpCode(200)
  singIn(@Body() singInDto: Record<string, any>) {
    return this.authService.singIn(singInDto.username, singInDto.password);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User has been successfully created' })
  @ApiBody({ type: User })
  @Public()
  @Post('register')
  @HttpCode(204)
  async register(@Body() createUserDto: userCreateDto) {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return await this.authService.singUp(createUserDto);
  }
}
