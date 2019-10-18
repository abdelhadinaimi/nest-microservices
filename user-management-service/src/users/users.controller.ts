import { Controller, Body, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { User } from './models/user.model';
import { GetUsersQuery } from './queries/impl';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @MessagePattern('get_users')
  async get(): Promise<string> {
    return 'hello';
  }

  @MessagePattern('register_user')
  async create(@Body() createUserDto: CreateUserDto) {
    Logger.log('In create', 'UsersController');
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }
  @MessagePattern('get_users')
  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @EventPattern('user_created')
  async catchEvent(@Body() createUserDto: CreateUserDto) {
    Logger.log('user_created catched !' + createUserDto, 'UsersController');
  }
}

