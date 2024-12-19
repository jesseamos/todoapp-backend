import { Todos } from "src/todos/todos.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Todos, (todo) => todo.user)
    todos: Todos[]
}