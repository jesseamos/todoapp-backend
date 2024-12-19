import { IsString, IsEmail, IsBoolean, IsOptional } from "class-validator";
export class CreateTodoDto {
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    description: string
}