import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todos } from './todos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule { }
