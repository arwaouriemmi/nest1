import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './Todo/Todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './Todo/entities/todo-model/todo.entity';
import { TodoMiddleware } from './middlewares/todo.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports:[ ConfigModule.forRoot({
    isGlobal: true,
  }),PassportModule.register({ defaultStrategy: 'jwt' }),JwtModule.register({secret:"arwa",signOptions:{expiresIn:3600}}),PremierModule,TodoModule, CommonModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.DATABASE_HOST ,
      port: parseInt(process.env.DATABASE_PORT),
      username:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:'tp2',
      entities: [TodoEntity],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(TodoMiddleware)
      .forRoutes(
        { path: 'todo/deletetodo/:id', method: RequestMethod.DELETE},
        { path: 'todo/updatetodo/:id', method: RequestMethod.PATCH },
      );
  }

}
