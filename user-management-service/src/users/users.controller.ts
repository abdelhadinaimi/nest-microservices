import { Controller, Body, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { UserDto } from './interfaces/user.dto';
import { User } from './models/user.model';
import { GetUsersQuery } from './queries/impl';

@Controller('users')
export class UsersController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @MessagePattern('get_users')
  async get(): Promise<string> {
    return "hello";
  }


  @MessagePattern('register_user')
  async create(@Body() userDto: UserDto){
    Logger.log("In create", "UsersController");
    return this.commandBus.execute(new CreateUserCommand(userDto));
  }
  @MessagePattern("get_users")
  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }
}

