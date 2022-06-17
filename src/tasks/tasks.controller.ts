import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFIlterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  //   @Get()
  //   getAllTasks(): Task[] {
  //     return this.tasksService.getAllTasks();
  //   }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.tasksService.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }
  @Get()
  getTasksFIlterDto(@Query() filterDto: GetTasksFIlterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id')
  patchTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param('id') id: string,
  ): void {
    const task = { id, ...createTaskDto, status: 'open' };
    return this.tasksService.updateTaskById(task);
  }
}
