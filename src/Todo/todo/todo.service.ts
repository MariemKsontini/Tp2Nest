import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { statusEnum } from './entities/statusEnum';
import { TodoModel } from './entities/TodoModel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, SelectQueryBuilder } from 'typeorm';
import { searchTodoDTO } from './dto/search-todo.dto';
import { TodoEntity } from './TodoEntity.entity';


@Injectable()
export class TodoService {
  @Inject('UUID') uuid: () => number;

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
    todos: TodoModel[] = [];
    

    
    async getTodos(queryParams? : searchTodoDTO){
      let res
      if(queryParams.critere !== undefined){
          res = await this.todoRepository.find({ where : [{ name : Like("%"+queryParams.critere+"%") }, {description : Like("%"+queryParams.critere+"%")}]})  
      }else if( queryParams.statut !== undefined) {
          res = await this.todoRepository.find({ where : {status : queryParams.statut}})
      }else{
          res = await this.todoRepository.find()
      }
      return res;
  }

    findAll(): TodoModel[] {
        return this.todos;
      }

    create(todo: AddTodoDto): TodoModel {
        const newTodo: TodoModel = {
          id: this.uuid(),
          name: todo.name,
          description: todo.description,
          createdAt: new Date(),
          status: statusEnum.EnAttente,
        };
        this.todos.push(newTodo);
        return this.todos[this.todos.length - 1];
      }
      async createTodoWithDb(todo: AddTodoDto): Promise<TodoEntity> {
        const newTodo = this.todoRepository.create(todo);
        try {
          return await this.todoRepository.save(newTodo);
        } catch (e) {
          throw new ConflictException(e.message);
        }
      }
    findTodoById(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
          throw new NotFoundException(`Todo with id ${id} not found`);
           }
        return todo;
         }
           
    removeTodoById(id: number) {
            const todo = this.findTodoById(id);
            this.todos = this.todos.filter((todo) => todo.id === id);
            return todo;
          }
    updateTodoById(id: number, newTodo: UpdateTodoDto) {
            const todo = this.findTodoById(id);
            const index = this.todos.findIndex((todo) => todo.id === id);
            this.todos[index] = { ...todo, ...newTodo };
            return this.todos[index];
          }
          async updateFromDb(idToFind: number, newTodo: UpdateTodoDto) {
            const todoFound= await this.todoRepository.preload( {
              id : idToFind, 
              name : newTodo.name, 
              description : newTodo.description,
              status : newTodo.status
            })
            if ( todoFound == undefined) 
            await this.todoRepository.save(todoFound) 
            else 
             return " non trouvé" 
            return "Mise à jour réussie"
          }
        
          async deleteFromDb(id: number) {
            const foundedTodo = await this.findTodoByIdDb(id);
            await this.todoRepository.delete(foundedTodo.id);
            return foundedTodo;
          }
        
          async softDeleteDb(id: number) {
            const foundedTodo = await this.findTodoByIdDb(id);
            await this.todoRepository.softDelete(foundedTodo.id);
            return foundedTodo;
          }
        
          async restoreDb(id: number) {
            return await this.todoRepository.restore(id);
          }
          async findTodoByIdDb(id: number): Promise<TodoEntity> {
            const foundedTodo = await this.todoRepository.findOneBy({ id });
            if (!foundedTodo) {
              throw new NotFoundException(`Todo with id ${id} not found`);
            }
            return foundedTodo;
          }
        
          async getStats() {
            return {
              waiting: await this.todoRepository.countBy({
                status: statusEnum.EnAttente,
              }),
              done: await this.todoRepository.countBy({ status: statusEnum.Finalise }),
              ongoing: await this.todoRepository.countBy({
                status: statusEnum.EnCours,
              }),
            };
          }
        }
        
