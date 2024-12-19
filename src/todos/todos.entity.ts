import { User } from "src/auth/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Todos {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    description: string
    @Column({ default: false })
    isCompleted: boolean
    @ManyToOne(() => User, (user) => user.todos)
    user: User
}