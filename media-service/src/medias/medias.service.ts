import { Injectable } from "@nestjs/common";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { UpdateMediaCommand } from "./commands/impl/update-media.command";
import { CreateMediaDto } from "./dto/create-media.dto";
import { CreateMediaCommand } from "./commands/impl/create-media.command";
import { GetMediasQuery } from "./queries/impl";
import { Media } from "./models/media.model";
import { GetMediaByIdQuery } from "./queries/impl/get-media-by-id.query";
import { UpdateMediaCreatorDto } from "./dto/update-media-creator.dto";
import { UpdateMediaCreatorCommand } from "./commands/impl/update-media-creator.command";
import { UpdateCreatorDto } from "./dto/update-creator.dto";
import { GetMediasByCreatorIdQuery } from "./queries/impl/get-medias-by-creator-id.query";
import { IMedia } from "./interfaces/media.interface";

type IError = {
  success: boolean,
  error: string,
};
@Injectable()
export class MediasService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async tryExecute(toExecute: () => any): Promise<any> {
    try {
      return await toExecute();
    } catch (e) {
      return {
        success: false,
        error: e.message,
      } as IError;
    }
  }

  update(updateMediaDto: UpdateMediaDto) {
    return this.tryExecute(() =>
      this.commandBus.execute(new UpdateMediaCommand(updateMediaDto))
    );
  }

  updateMediaCreator(updateMediaCreatorDto: UpdateMediaCreatorDto) {
    this.commandBus.execute(new UpdateMediaCreatorCommand(updateMediaCreatorDto));
  }
  
  async updateCreator(updateCreatorDto: UpdateCreatorDto) {
    const medias: IMedia[] = await this.queryBus.execute(new GetMediasByCreatorIdQuery(updateCreatorDto.creator._id));
    medias.forEach(media => {
      this.commandBus.execute(new UpdateMediaCreatorCommand({ _id: media._id, creator: updateCreatorDto.creator }));
    });
  }
  
  create(createMediaDto: CreateMediaDto) {
    return this.tryExecute(() =>
      this.commandBus.execute(new CreateMediaCommand(createMediaDto))
    );
  };

  findAll(): Promise<Media[]> {
    return this.tryExecute(() =>
      this.queryBus.execute(new GetMediasQuery())
    );
  }
  
  findById(_id: string) {
    return this.tryExecute(() =>
      this.queryBus.execute(new GetMediaByIdQuery(_id))
    );
  }
}