import { Transform, Expose } from "class-transformer";
export class TodoEntity {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    description: string

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number
}