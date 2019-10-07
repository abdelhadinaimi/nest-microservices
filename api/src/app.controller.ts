import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(): string {
    return "Hello I am authorized !";
  }

}
