import { Injectable, Inject, Logger } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { REDIS } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(REDIS.PROXY_NAME) private readonly client: ClientProxy) { }

  register(registerUserDto: RegisterUserDto) {
    return this.client.send("register_user", registerUserDto);
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    Logger.log(updateUserDto);
    return this.client.send("update_user", { _id, ...updateUserDto });
  }

  getById(_id: string) {
    return this.client.send<User>("get_user_by_id", { _id });
  }
  get() {
    return this.client.send<User[]>("get_users", {});
  }
}