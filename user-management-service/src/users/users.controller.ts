import { Controller, Body, Get, Post, Logger, ValidationPipe, UsePipes } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
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

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  // @EventPattern('create_user')
  async create(@Body() userDto: UserDto) {
    Logger.log("In create", "UsersController");
    return this.commandBus.execute(new CreateUserCommand(userDto));
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }
}

