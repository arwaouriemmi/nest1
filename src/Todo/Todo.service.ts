import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { AddtodoDto } from './dto/add-todo.dto';
import { TodoModel } from './entities/todo-model/todo-model';
import { UpdatetodoDto } from './dto/update-todo.dto';
import { TodoStatusEnum } from 'src/enums/TodostatusEnum';
import { PROVIDER_TOKEN } from 'src/common/common.module';
@Injectable()
export class TodoService {
  @Inject(PROVIDER_TOKEN.UUID) uuid ;
  private todos: TodoModel[]= [];

  constructor(
    
  ) {}
  getTodos(){
    return this.todos
}
addTodo(newtodo : AddtodoDto){
  const newelement ={ ...newtodo,id:this.uuid(),dateCreation:new Date(),status:newtodo.statut ?TodoStatusEnum[newtodo.statut]:TodoStatusEnum.waiting};
 console.log( newelement);
  this.todos.push(newelement);
  return(newelement);
}
updateTodo(newtodo :UpdatetodoDto, id:string){
const i=this.todos.findIndex((element)=>element.id===id);
 if (i!=-1){
    this.todos[i]={ ...this.todos[i], ...newtodo};
    return this.todos[i] ;
  }
  throw new  NotFoundException();
}
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


  }