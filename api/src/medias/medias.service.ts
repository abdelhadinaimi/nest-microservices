import { Injectable, Inject } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { AMQ_PROXY } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MediasService {
constructor(@Inject(AMQ_PROXY) private readonly client: ClientProxy) {}

  create(createMediaDto: CreateMediaDto) {
    return this.client.send("create_media",createMediaDto);
  }

  get() {
    return this.client.send("get_medias",{});
  }
}