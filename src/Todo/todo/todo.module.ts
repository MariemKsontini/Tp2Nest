import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './TodoEntity.entity';
import { TodoVersioningController } from '../todo.VersioningController';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoVersioningController],
  providers: [TodoService],
})
export class TodoModule {}