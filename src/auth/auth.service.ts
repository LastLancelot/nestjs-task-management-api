import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, _password: string): Promise<LoginResponse> {
    const user: User = await this.userService.findOne(username);
    const isUserExist = !!user;
    if (!isUserExist) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(_password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    delete user.password;
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserInput: CreateUserInput): Promise<User> {
    const password = createUserInput.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    createUserInput.password = hashedPassword;
    return this.userService.createUser(createUserInput);
  }
}
