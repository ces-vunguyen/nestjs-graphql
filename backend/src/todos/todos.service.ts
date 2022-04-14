import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  create(createTodoInput: CreateTodoInput) {
    return this.todosRepository.save(createTodoInput);
  }

  findAll() {
    return this.todosRepository.find();
  }

  findOne(id: number) {
    return this.todosRepository.findOne(id);
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    await this.todosRepository.update(id, updateTodoInput);
    return this.findOne(id);
  }

  remove(id: number) {
    this.todosRepository.delete(id);
    return { id };
  }
}
