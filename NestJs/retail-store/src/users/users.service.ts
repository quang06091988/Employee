import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    private findOneBy(username, password) {
        return this.repository.findOneBy({username, password});
    }

    async login(login: LoginDto, session) {
        const reqUser = await this.findOneBy(login.username, login.password);
        if(!reqUser) {
            throw new NotFoundException("username & password haven't exists");
        }
        session.userId = reqUser.id;
        return reqUser;
    }

    logout(session) {
        session.userId = null;
        return session;
    }
}
