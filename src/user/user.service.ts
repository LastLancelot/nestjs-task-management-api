import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserInput } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Omit<User, 'password'>[]> {
    return this.usersRepository.find({
      select: ['id', 'username', 'firstname', 'lastname'],
    });
  }

  findUserById(id: number): Promise<Omit<User, 'password'>> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'firstname', 'lastname'],
    });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async createUser(createUserSchema: CreateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        username: createUserSchema.username,
      },
    });
    if (user) {
      throw new HttpException('This username is taken', HttpStatus.BAD_REQUEST);
    }

    return this.usersRepository.save(createUserSchema);
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = this.usersRepository.findOne({
      where: {
        username: username,
      },
      select: ['id', 'username', 'firstname', 'lastname', 'password'],
    });
    return user;
  }
}
