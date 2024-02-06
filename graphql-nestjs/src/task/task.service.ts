import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  create(createTaskInput: CreateTaskInput) {
    return this.taskRepository.save(createTaskInput);
  }

  findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    await this.taskRepository.update(id, updateTaskInput);
    return this.taskRepository.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.taskRepository.delete({ id });
  }
}
