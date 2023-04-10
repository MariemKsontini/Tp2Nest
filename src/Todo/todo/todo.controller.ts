import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoModel } from './entities/TodoModel.entity';
import { UpdateTodoDto } from './dto/update-todo.dto'; 


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  findAll(): TodoModel[] {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() todo: AddTodoDto): Promise<TodoModel> {
    return this.todoService.create(todo);
  }

  @Get(':id')
  findOne(@Param('id') id: number): TodoModel {
    return <TodoModel>this.todoService.findTodoById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): TodoModel {
    return <TodoModel>this.todoService.removeTodoById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() newTodo: UpdateTodoDto): TodoModel {
    return <TodoModel>this.todoService.updateTodoById(id, newTodo);
  }
}