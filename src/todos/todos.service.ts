import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './todos.entity';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todos) private repo: Repository<Todos>) { }
    create(body: CreateTodoDto, user: User) {
        const todo = this.repo.create(body)
        todo.user = user
        return this.repo.save(todo)
    }

    async getAll() {
        const todos = await this.repo.find()
        return todos
    }

    async getOneTodo(id: string) {
        const todo = await this.repo.findOneBy({ id: parseInt(id) })
        if (!todo) {
            throw new NotFoundException(`can't find todo with ${id}`)
        }
        return todo
    }

    async deleteTodo(id: string) {
        const todo = await this.repo.findOneBy({ id: parseInt(id) })
        if (!todo) {
            throw new NotFoundException(`can't find todo with ${id}`)
        }
        return this.repo.remove(todo)
    }

    async update(id: string, body: CreateTodoDto) {
        const todo = await this.repo.findOneBy({ id: parseInt(id) })
        if (!todo) {
            throw new NotFoundException(`can't find todo with ${id}`)
        }
        this.repo.update(id, body)
        return todo
    }

    async searchTerm(title: string) {
        const todo = await this.repo.find({ where: { title } })
        return todo
    }

}
