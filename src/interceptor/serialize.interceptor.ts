import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map } from "rxjs";


export function serialize(dto: any) {
    return UseInterceptors(new Serialization(dto))
}
class Serialization implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map((data: any) => {
               return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}