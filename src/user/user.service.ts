import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { userCreateDto } from './user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findUserById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async createUser(createUserSchema: userCreateDto): Promise<User> {
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
    });
    return user;
  }
}
