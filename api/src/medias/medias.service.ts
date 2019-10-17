import { Injectable, Inject } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { AMQ_PROXY } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './interfaces/media.interface';

@Injectable()
export class MediasService {
  constructor(@Inject(AMQ_PROXY) private readonly client: ClientProxy) { }

  create(createMediaDto: CreateMediaDto) {
    return this.client.send("create_media", createMediaDto);
  }

  update(_id: string, updateMediaDto: UpdateMediaDto) {
    return this.client.send("update_media", { _id, ...updateMediaDto });
  }

  get() {
    return this.client.send<Media[]>("get_medias", {});
  }
}