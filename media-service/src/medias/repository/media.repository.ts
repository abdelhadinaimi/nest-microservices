import { IMedia } from "../interfaces/media.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMediaDto } from "../dto/create-media.dto";
import { Media } from "../models/media.model";


export class MediaRepository {

  constructor(@InjectModel('Media') private readonly mediaModel: Model<IMedia>) { }

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const createdMedia = await new this.mediaModel(createMediaDto).save();
    const mediaModel = new Media(createdMedia._id);
    mediaModel.setData({ ...createMediaDto, _id: createdMedia._id });
    return mediaModel;
  }

  async findAll(): Promise<IMedia[]> {
    return await this.mediaModel.find().exec();
  }
}