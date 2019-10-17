import { IMedia } from "../interfaces/media.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Error as MongooseError } from "mongoose";
import { CreateMediaDto } from "../dto/create-media.dto";
import { Media } from "../models/media.model";
import { UpdateMediaDto } from "../dto/update-media.dto";
import { Logger } from "@nestjs/common";
import { ErrorMessages } from "../medias.constants";
import { UpdateWriteOpResult, WriteOpResult } from "mongodb";


export class MediaRepository {

  constructor(@InjectModel('Media') private readonly mediaModel: Model<IMedia>) { }

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const createdMedia: IMedia = await new this.mediaModel(createMediaDto).save();
    return new Media(createdMedia._id);
  }

  async updateMedia(updateMediaDto: UpdateMediaDto): Promise<Media> {
    const updatedMedia: IMedia = await this.mediaModel
      .findOneAndUpdate({ _id: updateMediaDto._id }, { $set: updateMediaDto })
      .exec();
    if (!updatedMedia) {
      throw new Error(ErrorMessages.MEDIA_NOT_FOUND);
    }
    return new Media(updatedMedia._id);
  }

  async findById(id: String): Promise<IMedia> {
    const media = await this.mediaModel.findById(id).exec();
    if (!media) {
      throw new Error(ErrorMessages.MEDIA_NOT_FOUND);
    }
    return media;
  }

  async findAll(): Promise<IMedia[]> {
    return await this.mediaModel.find().exec();
  }
}