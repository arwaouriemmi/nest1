import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { AddtodoDto } from './dto/add-todo.dto';
import { TodoEntity } from './entities/todo-model/todo.entity';
import { UpdatetodoDto } from './dto/update-todo.dto';
import { TodoStatusEnum } from 'src/enums/TodostatusEnum';
import { PROVIDER_TOKEN } from 'src/common/common.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { CriteriatodoDto  } from './dto/criteria-todo.dto';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class TodoService {
  @Inject(PROVIDER_TOKEN.UUID) uuid ;
  private todos: TodoEntity[]= [];

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    private jwtService:JwtService
    
  ) {}
  /*
  getTodos(){
    return this.todos
}

addTodo(newtodo : AddtodoDto){
  const newelement ={ ...newtodo,id:this.uuid(),dateCreation:new Date(),status:newtodo.statut ?TodoStatusEnum[newtodo.statut]:TodoStatusEnum.waiting};
 console.log( newelement);
  this.todos.push(newelement);
  return(newelement);
}
*/
async addTodo(newtodo : AddtodoDto) : Promise<TodoEntity>{ 
  newtodo.statut=TodoStatusEnum.waiting;
  const payload = { userId: newtodo.userId };
  const token = await this.jwtService.sign(payload);
  console.log(token);
      const todo={token,...newtodo}
    
  return await this.todoRepository.save(todo);
}
/*
updateTodo(newtodo :UpdatetodoDto, id:string){
const i=this.todos.findIndex((element)=>element.id===id);
 if (i!=-1){
    this.todos[i]={ ...this.todos[i], ...newtodo};
    return this.todos[i] ;
  }
  throw new  NotFoundException();
}

async updateTodo(newtodo :UpdatetodoDto,id:number){
  const element= await this.todoRepository.findOneBy({id:id});
  const newElement = await this.todoRepository.preload({
    id,
    ...newtodo
  })
  if (!newElement){
    throw new  NotFoundException(`le todo d'id ${id} n'existe pas `);
  }
  return await this.todoRepository.save(newElement);
  }
  

  /*
getTodo(id: string){
    const element=this.todos.find((element)=>element.id==id);
  if (element){
    return element;
  }
  throw new  NotFoundException();
}


DeleteTodo(id: string){
  const element=this.getTodo(id);
      const i=this.todos.indexOf(element);
      this.todos.splice(i,1);
      return element ;
    
 
  }
*/
async updateTodo(newtodo :UpdatetodoDto,id:number){
  const element= await this.todoRepository.findOneBy({id:id});
  const newElement = await this.todoRepository.preload({
    id,
    ...newtodo
  })
  if (!newElement){
    throw new  NotFoundException(`le todo d'id ${id} n'existe pas `);
  }
  return await this.todoRepository.save(newElement);
  }
async getTodo(id: number):Promise<TodoEntity>{
  const element= await this.todoRepository.findOneBy({id:id});
if (element){
  return element;
}
throw new  NotFoundException();
}
async DeleteTodo(id: number){
 
      return await this.todoRepository.delete(id) ;
    
 
  }
  async SoftDeleteTodo(id: number){
  
    return  this.todoRepository.softDelete(id);

}
async RestoreTodo(id: number){

  return  this.todoRepository.restore(id);


}
async stat() {
  const qb= this.todoRepository.createQueryBuilder("todo");
 qb.select("todo.statut,count(todo.id) as nombreDeTodo")
  .groupBy("todo.statut")
        return await qb.getRawMany();
}
async getAllTodos(take:number,skip:number): Promise<TodoEntity[]>{
  return await this.todoRepository.find({
    take :take ,
    skip :skip
  });
                                  

}
async getTodoByCreteria1(params:CriteriatodoDto): Promise<TodoEntity[]>{
      const {critere,statut} =params ;
      return await this.todoRepository.find({
        where:[
          {
           statut:statut , 
          },
          {
            name: Like(`%${critere}%`) ,
          },
          {
            description: Like(`%${critere}%`),
          }
        ]

      })                          

}
async getTodoByCreteria2(params:CriteriatodoDto): Promise<TodoEntity[]>{
  const {critere,statut} =params ;
  const QueryBuilder=this.todoRepository.createQueryBuilder("todos") ;
  const q=QueryBuilder.where('todos.name like :critere OR todos.description like :critere',{critere: `%${critere}%` })
  .andWhere('todos.statut = :statut',{statut:statut})
  .getMany();
  
 return q;                          

}


  }