import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAllUsersTask(id: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: {
        ownerId: id,
      },
    });
  }
  async findOne(id: number): Promise<Task | null> {
    return await this.tasksRepository.findOneBy({ id });
  }

  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(createTaskDto.ownerId);
    return await this.tasksRepository.save(createTaskDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.tasksRepository.delete(id);
  }
}
