import { Injectable, Inject } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { REDIS_SERVICE } from './users.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
constructor(@Inject(REDIS_SERVICE) private readonly client: ClientProxy) {}

  register(registerUserDto: RegisterUserDto) {
    return this.client.send("register_user",registerUserDto);
  }

  get() {
    return this.client.send("get_users",{});
  }
}