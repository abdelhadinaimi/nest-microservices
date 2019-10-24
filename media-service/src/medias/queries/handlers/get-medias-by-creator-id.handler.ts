import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { MediaRepository } from "../../repository/media.repository";
import { Logger } from "@nestjs/common";
import { GetMediasByCreatorIdQuery } from "../impl/get-medias-by-creator-id.query";

@QueryHandler(GetMediasByCreatorIdQuery)
export class GetMediaByCreatorIdHandler implements IQueryHandler<GetMediasByCreatorIdQuery> {

  constructor(private readonly mediaRepository: MediaRepository) { }

  async execute(query: GetMediasByCreatorIdQuery): Promise<any> {
    Logger.log('Async GetMediasByCreatorIdQuery...', 'GetMediaByCreatorIdHandler');
    return this.mediaRepository.findByCreatorId(query._id);
  }

} 