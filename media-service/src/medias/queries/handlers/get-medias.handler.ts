import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetMediasQuery } from "../impl";
import { MediaRepository } from "../../repository/media.repository";
import { Logger } from "@nestjs/common";

@QueryHandler(GetMediasQuery)
export class GetMediasHandler implements IQueryHandler<GetMediasQuery> {

  constructor(private readonly mediaRepository: MediaRepository) { }

  async execute(query: GetMediasQuery): Promise<any> {
    Logger.log('Async GetMediasQuery...', 'GetMediasHandler');
    return this.mediaRepository.findAll();
  }

} 