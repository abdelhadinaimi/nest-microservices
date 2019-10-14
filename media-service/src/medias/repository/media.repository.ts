import { IMedia } from "../interfaces/media.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Error as MongooseError } from "mongoose";
import { CreateMediaDto } from "../dto/create-media.dto";
import { Media } from "../models/media.model";
import { UpdateMediaDto } from "../dto/update-media.dto";
import { Logger } from "@nestjs/common";
import { ErrorMessages } from "../medias.constants";


export class MediaRepository {

  constructor(@InjectModel('Media') private readonly mediaModel: Model<IMedia>) { }

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const createdMedia: IMedia = await new this.mediaModel(createMediaDto).save();
    return new Media(createdMedia._id);
  }

  async updateMedia(updateMediaDto: UpdateMediaDto): Promise<Media> {
    try {
      await this.mediaModel.updateOne({ _id: updateMediaDto._id }, updateMediaDto).exec();
      // TODO Check if update was successful
      return new Media(updateMediaDto._id);
    }
    catch (err) {
      throw new Error(ErrorMessages.FETCHING_DB);
    }
  }

  async findById(id: String): Promise<IMedia> {
    try {
      return await this.mediaModel.findById(id).exec();
    }
    catch (err) {
      if (err.message instanceof MongooseError.CastError) {
        throw new Error(ErrorMessages.MEDIA_NOT_FOUND);
      }
      throw new Error(ErrorMessages.FETCHING_DB);
    }
  }

  async findAll(): Promise<IMedia[]> {
    return await this.mediaModel.find().exec();
  }
}