import { Controller, Body, Logger, CacheKey, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMediaCommand } from './commands/impl/create-media.command';
import { Media } from './models/media.model';
import { GetMediasQuery } from './queries/impl';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { UpdateMediaCommand } from './commands/impl/update-media.command';
import { GetMediaByIdQuery } from './queries/impl/get-media-by-id.query';

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
  async create(@Body() createMediaDto: CreateMediaDto) {
    Logger.log('In create', 'MediasController');
    return this.commandBus.execute(new CreateMediaCommand(createMediaDto));
  }

  @MessagePattern('update_media')
  async update(@Body() updateMediaDto: UpdateMediaDto) {
    Logger.log('In update', 'MediasController');
    try {
      return await this.commandBus.execute(new UpdateMediaCommand(updateMediaDto));
    }
    catch (e) {
      return {
        success: false,
        error: e.message,
      }
    }
  }

  @CacheKey('get_medias')
  @UseInterceptors(CacheInterceptor)
  @MessagePattern('get_medias')
  async findAll(): Promise<Media[]> {
    return this.queryBus.execute(new GetMediasQuery());
  }

  @CacheKey('get_media_by_id')
  @UseInterceptors(CacheInterceptor)
  @MessagePattern('get_media_by_id')
  async findById(@Body() _id: string) {
    try {
      return await this.queryBus.execute(new GetMediaByIdQuery(_id));
    } catch (e) {
      return {
        success: false,
        error: e.message,
      }
    }
  }

  @EventPattern('media_created')
  async catchEvent(@Body() createMediaDto: CreateMediaDto) {
    Logger.log('media_created catched !' + createMediaDto, 'MediasController');
  }
}

