import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UseInterceptors } from '@nestjs/common';
import { serialize } from 'src/interceptor/serialize.interceptor';
import { UserDataDto } from './dtos/user-data.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from '../guards/auth.guards';



@Controller('auth')
@serialize(UserDataDto)
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    async signup(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body)
        session.userId = user.id
        return user

    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signout')
    async signout(@Session() session: any) {
        session.userId = null
        // console.log(session.userStatus)
    }

    @UseGuards(AuthGuard)
    @Get('/currrent-user')
    async getCurrentUser(@CurrentUser() user: any) {
        return user;
    }

}
