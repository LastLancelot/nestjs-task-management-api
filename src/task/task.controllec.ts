import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task } from './task.entity';
import { CreateTaskDto } from './task.dto';
import { validate } from 'class-validator';

@ApiTags('Task controller')
@Controller('task')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @ApiOperation({ summary: 'Get all user`s task' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('Tasks')
  async getAllUsersTask(@Request() req) {
    const id = req.user.sub;
    return await this.tasksService.findAllUsersTask(id);
  }

  @ApiOperation({ summary: 'Create task' })
  @UseGuards(AuthGuard)
  @ApiBody({ type: Task })
  @ApiBearerAuth()
  @Post('Create')
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    createTaskDto.ownerId = await req.user.sub;
    console.log(req.user.sub, createTaskDto.ownerId);
    const errors = await validate(createTaskDto);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return await this.tasksService.createTask(createTaskDto);
  }
}
