import { Controller, Post, Body, Logger, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto/register-user.dto";



@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async register(@Body() registerUserDto: RegisterUserDto) {
    const r = await this.usersService.register(registerUserDto);
    Logger.log(r, "UserController");
    return r;
  }

  @Get()
  async get() {
    return this.usersService.get();
  }
}
