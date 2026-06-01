import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { userCreateDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async singIn(username: string, _password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== _password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(createUserSchema: userCreateDto): Promise<any> {
    return this.userService.createUser(createUserSchema);
  }
}
