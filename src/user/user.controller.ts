import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ summary: 'Get all profile' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('All')
  async GetAllUser(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get profile of JWT token owner' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile/')
  getProfile(@Request() req) {
    return req.user;
  }
}
