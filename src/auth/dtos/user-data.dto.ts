import { Expose } from "class-transformer";
export class UserDataDto {
    @Expose()
    firstName: string

    @Expose()
    lastName: string

    @Expose()
    email: string
}