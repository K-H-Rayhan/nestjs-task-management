import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFIlterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task: Task = this.tasks.find((task): any => {
      return task.id == id;
    });
    return task;
  }
  getTasksWithFilters(filterDto: GetTasksFIlterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((e) => e.status == status);
    }
    if (search) {
      tasks = tasks.filter((e) => {
        if (e.title.includes(search) || e.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((e) => {
      return e.id != id;
    });
  }
  updateTaskById(task: any): void {
    var found: boolean = false;
    this.tasks.map((e, i) => {
      if (e.id == task.id) {
        this.tasks[i] = task;
        found = true;
      }
    });
    if (!found) {
      throw new NotFoundException(`${task.id} not found`);
    }
  }
}
