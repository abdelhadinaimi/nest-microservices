import { Controller, Post, Logger, Get, Body } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { MediasService } from "./medias.service";



@Controller("medias")
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  async register(@Body() createMediaDto: CreateMediaDto) {
    const r = await this.mediasService.create(createMediaDto);
    Logger.log(r, "MediasController");
    return r;
  }

  @Get()
  async get() {
    return this.mediasService.get();
  }
}