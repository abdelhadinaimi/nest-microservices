import { MediaDto } from "../interfaces/media.dto";
import { Media } from "../models/media.model";


export class MediaRepository {
  private medias: Media[] = [];
  async createMedia(mediaDto: MediaDto): Promise<Media> {
    const media = new Media(Math.floor(Math.random()*1000)+"");
    media.setData(mediaDto);
    this.medias.push(media);
    return media;
  }

  async findAll(): Promise<Media[]> {
    return this.medias;
  }
}