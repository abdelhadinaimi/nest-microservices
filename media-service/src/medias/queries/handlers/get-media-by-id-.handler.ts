import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { MediaRepository } from "../../repository/media.repository";
import { Logger } from "@nestjs/common";
import { GetMediaByIdQuery } from "../impl/get-media-by-id.query";

@QueryHandler(GetMediaByIdQuery)
export class GetMediaByIdHandler implements IQueryHandler<GetMediaByIdQuery> {

  constructor(private readonly mediaRepository: MediaRepository) { }

  async execute(query: GetMediaByIdQuery): Promise<any> {
    Logger.log('Async GetMediaByIdQuery...', 'GetMediaByIdHandler');
    return this.mediaRepository.findById(query._id);
  }

} 