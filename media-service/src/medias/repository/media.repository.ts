import { IMedia } from "../interfaces/media.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMediaDto } from "../dto/create-media.dto";
import { Media } from "../models/media.model";
import { UpdateMediaDto } from "../dto/update-media.dto";
import { ErrorMessages } from "../medias.constants";
import { UpdateMediaCreatorDto } from "../dto/update-media-creator.dto";


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

  async updateMediaCreator(updateMediaCreator: UpdateMediaCreatorDto): Promise<Media> {
    const mediaToUpdate: IMedia = await this.mediaModel.findById(updateMediaCreator._id).exec();
    if (!mediaToUpdate) {
      throw new Error(ErrorMessages.MEDIA_NOT_FOUND);
    }
    Object.keys(updateMediaCreator.creator).forEach(k => {
      mediaToUpdate.creator[k] = updateMediaCreator.creator[k] || mediaToUpdate.creator[k];
    });
    await mediaToUpdate.save();
    return new Media(mediaToUpdate._id);
  }

  async findByCreatorId(id: string): Promise<IMedia[]> {
    return await this.mediaModel.find({ "creator._id": id }).exec();
  }

  async findById(id: string): Promise<IMedia> {
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