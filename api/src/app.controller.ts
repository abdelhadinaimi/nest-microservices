import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ArrayDto } from './array.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("sum")
  async sum(@Body() arrayDto: ArrayDto): Promise<number> {
    return this.appService.sum(arrayDto);
  }
}
