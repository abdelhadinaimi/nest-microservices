import { Controller, Post, Logger, Get, Body, Param, Put, UseInterceptors, CacheInterceptor } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { MediasService } from "./medias.service";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { IsMongoId } from "class-validator";


class FindMongoId {
  @IsMongoId()
  id: string;
}

@Controller("medias")
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.create(createMediaDto);
  }

  @Put('/:id')
  update(@Param() params: FindMongoId, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.update(params.id, updateMediaDto);
  }

  @Get('/:id')
  getById(@Param() params: FindMongoId) {
    return this.mediasService.getById(params.id);
  }
  @Get()
  // @UseInterceptors(CacheInterceptor) might cause some inconsistency issues if we have two versions of the cache in 2 diffrent services?
  get() {
    return this.mediasService.get();
  }
}

