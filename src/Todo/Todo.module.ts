import { Module } from '@nestjs/common';
import { TodoController } from './Todo.controller';
import { TodoService } from './Todo.service';
@Module({
  controllers: [TodoController],
  providers: [TodoService]
  
})
export class TodoModule {}