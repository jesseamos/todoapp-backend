import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private authService: AuthService) { }
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session
        if (userId) {
            const user = await this.authService.findUser(userId)
            request.session.currentUser = user
        }
        return next.handle()
    }
}