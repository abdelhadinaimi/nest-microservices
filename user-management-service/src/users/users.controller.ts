import { Controller, Body, Get, Logger, UseInterceptors, CacheKey, CacheInterceptor } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { User } from './models/user.model';
import { GetUsersQuery } from './queries/impl';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdQuery } from './queries/impl/get-user-by-id.query';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCommand } from './commands/impl/update-user.command';

@Controller('users')
export class UsersController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @MessagePattern('register_user')
  async create(@Body() createUserDto: CreateUserDto) {
    Logger.log('In create', 'UsersController');
    try {
      return await this.commandBus.execute(new CreateUserCommand(createUserDto));
    } catch (e) {
      return {
        success: false,
        error: e.message,
      }
    }
  }

  @MessagePattern('update_user')
  async update(@Body() updateUserDto: UpdateUserDto) {
    Logger.log('In update', 'UsersController');
    try {
      return await this.commandBus.execute(new UpdateUserCommand(updateUserDto));
    }
    catch (e) {
      return {
        success: false,
        error: e.message,
      }
    }
  }

  @CacheKey('get_user_by_id')
  @UseInterceptors(CacheInterceptor)
  @MessagePattern('get_user_by_id')
  async findById(@Body() _id: string) {
    try {
      return await this.queryBus.execute(new GetUserByIdQuery(_id));
    } catch (e) {
      return {
        success: false,
        error: e.message,
      }
    }
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

