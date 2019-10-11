import { Controller, Body, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMediaCommand } from './commands/impl/create-media.command';
import { MediaDto } from './interfaces/media.dto';
import { Media } from './models/media.model';
import { GetMediasQuery } from './queries/impl';

@Controller('medias')
export class MediasController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @MessagePattern('get_medias')
  async get(): Promise<string> {
    return 'hello';
  }

  @MessagePattern('create_media')
  async create(@Body() mediaDto: MediaDto) {
    Logger.log('In create', 'MediasController');
    return this.commandBus.execute(new CreateMediaCommand(mediaDto));
  }
  @MessagePattern('get_medias')
  async findAll(): Promise<Media[]> {
    return this.queryBus.execute(new GetMediasQuery());
  }

  @EventPattern('media_created')
  async catchEvent(@Body() mediaDto: MediaDto) {
    Logger.log('media_created catched !' + mediaDto, 'MediasController');
  }
}

