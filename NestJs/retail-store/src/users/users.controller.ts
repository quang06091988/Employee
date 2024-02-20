import { Controller, Session, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @Get('/whoami')
    whoami(@Session() session) {
        return session;
    }

    @Post('/login')
    login(@Body() login: LoginDto, @Session() session) {
        return this.service.login(login, session);
    }

    @Post('logout')
    Logout(@Session() session) {
        return this.service.logout(session);
    }
}