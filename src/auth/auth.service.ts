import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    username: string,
    _password: string,
  ): Promise<{ user: User; access_token: string }> {
    const user: User = await this.userService.findOne(username);
    if (user?.password !== _password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserSchema: CreateUserInput): Promise<User> {
    return this.userService.createUser(createUserSchema);
  }
}
