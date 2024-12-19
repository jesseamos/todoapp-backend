import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { serialize } from 'src/interceptor/serialize.interceptor';
import { TodoEntity } from './dtos/todo.dto';

@UseGuards(AuthGuard)
@Controller('todos')
@serialize(TodoEntity)
export class TodosController {
    constructor(private todosService: TodosService) { }

    @Post()
    createTodo(@Body() body: CreateTodoDto, @CurrentUser() user: User) {
        return this.todosService.create(body, user)
    }

    @Get('searchTerm')
    getSearchTerm(@Query('title') query: string) {
        return this.todosService.searchTerm(query)
    }

    @Get()
    getAllTodos() {
        return this.todosService.getAll()
    }

    @Patch('/:id')
    updateTodo(@Param('id') id: string, @Body() body: CreateTodoDto) {
        return this.todosService.update(id, body)
    }

    @Delete('/:id')
    deleteTodo(@Param('id') id: string) {
        this.todosService.deleteTodo(id)
    }

    @Get('/:id')
    getTodo(@Param('id') id: string) {
        return this.todosService.getOneTodo(id)
    }

}
