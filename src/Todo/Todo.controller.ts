import {
    Controller,
    Get,
    Put,
    Delete,
    Patch,
    Body,
    Param,
    Post,
    NotFoundException,
    HttpStatus,
    UnauthorizedException
  } from '@nestjs/common';
  import jwt from 'jsonwebtoken';
  import { TodoRequest} from '../todoRequest';
  import { AuthGuard } from '@nestjs/passport';
  import { TodoService } from './Todo.service';
  import { ParseIntPipe, Version } from '@nestjs/common';
import { TodoEntity } from './entities/todo-model/todo.entity';
import { TodoStatusEnum } from 'src/enums/TodostatusEnum';
import { AddtodoDto } from './dto/add-todo.dto';
import { UpdatetodoDto } from './dto/update-todo.dto';
import { Query, Req, UseGuards } from '@nestjs/common/decorators';
import { CriteriatodoDto } from './dto/criteria-todo.dto';
 

 
  
  @Controller('todo')
  export class TodoController {
    
    constructor(
      private TodoService: TodoService,
        ) {}
        /*
    @Get()
    getTodos(){
        return this.TodoService.getTodos();
    }
    */
    @Post('addtodo')
  
    async addTodo(@Body() newtodo : AddtodoDto) : Promise<TodoEntity>{
      
        return  await this.TodoService.addTodo(newtodo);
    }
    

    /*
    @Get(':id')
    getTodo(@Param('id') id: string){
    
        return this.TodoService.getTodo(id);
      
    }
    */
    @Delete('deletetodo/:id')
    async deleteTodo(@Param('id', ParseIntPipe) id: number,@Req() req: TodoRequest){
      const todo = await this.TodoService.getTodo(id);
      if (todo.userId !== req.userId) { 
        throw new UnauthorizedException('Vous n\'êtes pas autorisé à modifier ce todo');
      }
      return this.TodoService.DeleteTodo(id);
   
  }
    @Delete('softdeletetodo/:id')
    async softdeleteTodo(@Param('id', ParseIntPipe) id: number,@Req() req: TodoRequest){
      const todo = await this.TodoService.getTodo(id);
      if (todo.userId !== req.userId) { 
        throw new UnauthorizedException('Vous n\'êtes pas autorisé à modifier ce todo');
      }
      return this.TodoService.SoftDeleteTodo(id);
   
  }
    @Get('restoretodo/:id')
    async restoreTodo(@Param('id', ParseIntPipe) id: number){
   
      return await this.TodoService.RestoreTodo(id);
   
  }
   /*
    @Patch('updatetodo/:id')
    async updateTodo(@Body() newtodo : UpdatetodoDto ,@Param('id', ParseIntPipe) id: number): Promise<TodoEntity>{
   
        return await  this.TodoService.updateTodo(newtodo,id);
   
  }
  */
  @Patch('updatetodo/:id')
  async updateTodo(@Body() newtodo : UpdatetodoDto ,@Param('id', ParseIntPipe) id: number,@Req() req: TodoRequest): Promise<TodoEntity>{
    const todo = await this.TodoService.getTodo(id);
    if (todo.userId !== req.userId) { 
      throw new UnauthorizedException('Vous n\'êtes pas autorisé à modifier ce todo');
    }
      return await  this.TodoService.updateTodo(newtodo,id);
 
}
  @Get('stat')
  async stat(){
    return this.TodoService.stat() ;
  }
  @Get()
  @Version('1')
  async getTodos(@Query() mesQueryParams) : Promise<TodoEntity[]>{
    const take = mesQueryParams.take ;
    const page=mesQueryParams.page ;
    const skip= (page-1) * take ;
    return await this.TodoService.getAllTodos(take,skip) ;
  }
  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number):Promise<TodoEntity>{
  
      return await this.TodoService.getTodo(id);
    
  }
  @Get()
  @Version('2')
  async getTodoByCriteria1(@Query('critere') critere:string,@Query('statut') statut:TodoStatusEnum):Promise<TodoEntity[]>{
  
      const params:CriteriatodoDto={critere,statut} ;
      return this.TodoService.getTodoByCreteria1(params);
    
  }
  @Get()
  @Version('3')
  async getTodoByCriteria2(@Query('critere') critere:string,@Query('statut') statut:TodoStatusEnum):Promise<TodoEntity[]>{
  
      const params:CriteriatodoDto={critere,statut} ;
      return this.TodoService.getTodoByCreteria2(params);
    
  }

     }
   