import { Controller, Post, Body, Logger, Get, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { IsMongoId } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

class FindMongoId {
  @IsMongoId()
  id: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Put('/:id')
  update(@Param() params: FindMongoId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Get('/:id')
  getById(@Param() params: FindMongoId) {
    return this.usersService.getById(params.id);
  }

  @Get()
  async get() {
    return this.usersService.get();
  }
}
