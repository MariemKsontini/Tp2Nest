import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { TodoService } from './todo/todo.service';
import { searchTodoDTO } from './todo/dto/search-todo.dto';
import { AddTodoDto } from './todo/dto/add-todo.dto';
import { UpdateTodoDto } from './todo/dto/update-todo.dto';
import { TodoEntity } from './todo/TodoEntity.entity';


@Controller({
  version: '2',
  path: 'todo',
})
export class TodoVersioningController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(@Query() queryParams : searchTodoDTO){
      return this.todoService.getTodos(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.todoService.findTodoByIdDb(id);
  }

  @Post()
  async create(@Body() addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return await this.todoService.createTodoWithDb(addTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() newTodo: UpdateTodoDto) {
    return this.todoService.updateFromDb(id, newTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.deleteFromDb(id);
  }

  @Delete('soft/:id')
  softRemove(@Param('id') id: number) {
    return this.todoService.softDeleteDb(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: number) {
    return this.todoService.restoreDb(id);
  }
  @Get('/stats')
  getStatsTodoDb() {
    return this.todoService.getStats();
  }
}