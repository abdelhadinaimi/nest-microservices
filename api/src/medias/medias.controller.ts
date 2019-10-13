import { Controller, Post, Logger, Get, Body, Param, Put } from "@nestjs/common";
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
  async create(@Body() createMediaDto: CreateMediaDto) {
    const r = await this.mediasService.create(createMediaDto);
    Logger.log(r, "MediasController");
    return r;
  }

  @Put('/:id')
  async update(@Param() params: FindMongoId, @Body() updateMediaDto: UpdateMediaDto) {
    return await this.mediasService.update(params.id, updateMediaDto);
  }

  @Get()
  async get() {
    return this.mediasService.get();
  }
}

