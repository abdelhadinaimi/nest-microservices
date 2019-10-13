import { IMedia } from "../interfaces/media.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMediaDto } from "../dto/create-media.dto";
import { Media } from "../models/media.model";
import { UpdateMediaDto } from "../dto/update-media.dto";
import { UpdateWriteOpResult } from "mongodb";


export class MediaRepository {

  constructor(@InjectModel('Media') private readonly mediaModel: Model<IMedia>) { }

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const createdMedia: IMedia = await new this.mediaModel(createMediaDto).save();
    return new Media(createdMedia._id);
  }

  async updateMedia(updateMediaDto: UpdateMediaDto): Promise<Media> {
    const mediaToUpdate: IMedia = await this.mediaModel.findById(updateMediaDto._id).exec();
    // TODO Check for exception NotFound
    await mediaToUpdate.update(updateMediaDto).exec();
    // TODO Check if update was successful
    return new Media(updateMediaDto._id);
  }

  async findAll(): Promise<IMedia[]> {
    return await this.mediaModel.find().exec();
  }
}