import { Controller, Body, Logger, CacheKey, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasService } from './medias.service';
import { UpdateMediaCreatorDto } from './dto/update-media-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Controller('medias')
export class MediasController {

  constructor(
    private readonly mediasService: MediasService,
  ) { }

  @MessagePattern('create_media')
  async create(@Body() createMediaDto: CreateMediaDto) {
    Logger.log('In create', 'MediasController');
    return this.mediasService.create(createMediaDto);
  }

  @MessagePattern('update_media')
  update(@Body() updateMediaDto: UpdateMediaDto) {
    Logger.log('In update', 'MediasController');
    return this.mediasService.update(updateMediaDto);
  }

  @CacheKey('get_medias')
  @UseInterceptors(CacheInterceptor)
  @MessagePattern('get_medias')
  async findAll() {
    return this.mediasService.findAll();
  }

  @CacheKey('get_media_by_id')
  @UseInterceptors(CacheInterceptor)
  @MessagePattern('get_media_by_id')
  async findById(@Body() _id: string) {
    return this.mediasService.findById(_id);
  }

  @EventPattern('media_created')
  async catchCreateEvent(@Body() createMediaDto: CreateMediaDto) {
    Logger.log('media_created catched !' + createMediaDto, 'MediasController');
  }

  @EventPattern('media_updated')
  async catchUpdateEvent(@Body() updateMediaDto: UpdateMediaDto | UpdateMediaCreatorDto) {
    Logger.log('media_updated catched ' + updateMediaDto._id, 'MediasController');
  }

  @EventPattern('user_updated_creator_info')
  catchCreatorUpdateEvent(@Body() updateCreatorDto: UpdateCreatorDto) {
    this.mediasService.updateCreator(updateCreatorDto);
  }
}