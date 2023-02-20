import {
    Controller,
    Get,
    Put,
    Delete,
    Patch,
    Body,
    Param,
    Post,
    NotFoundException
  } from '@nestjs/common';

  import { TodoService } from './Todo.service';
  import { ParseIntPipe } from '@nestjs/common';
import { TodoModel } from './entities/todo-model/todo-model';
import { TodoStatusEnum } from 'src/enums/TodostatusEnum';
import { AddtodoDto } from './dto/add-todo.dto';
import { UpdatetodoDto } from './dto/update-todo.dto';
 
  //import { Post } from '@nestjs/common/decorators';
 
  
  @Controller('todo')
  export class TodoController {
    
    constructor(
      private TodoService: TodoService,
        ) {}
    @Get()
    getTodos(){
        return this.TodoService.getTodos();
    }
    @Post('addtodo')
    addTodo(@Body() newtodo : AddtodoDto){
       
        return this.TodoService.addTodo(newtodo);
    }
    @Patch('updatetodo/:id')
    updateTodo(@Body() newtodo : UpdatetodoDto,@Param('id') id: string){
       console.log(id);
        return this.TodoService.updateTodo(newtodo,id);
    
    }
    @Get(':id')
    getTodo(@Param('id') id: string){
    
        return this.TodoService.getTodo(id);
      
    }
    @Delete('deletetodo/:id')
    DeleteTodo(@Param('id') id: string){
        return this.TodoService.DeleteTodo(id);
      
    }
   
   
     }
   