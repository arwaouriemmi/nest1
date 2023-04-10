import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoMiddleware } from 'src/middlewares/todo.middleware';
import { TodoEntity } from './entities/todo-model/todo.entity';
import { TodoController } from './Todo.controller';
import { TodoService } from './Todo.service';
@Module({
  imports  :  [PassportModule.register({ defaultStrategy: 'jwt' }),JwtModule.register({secret:"arwa",signOptions:{expiresIn:3600}}),TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService] ,
  exports : [TodoService]
  
})
export class TodoModule  {

 
}