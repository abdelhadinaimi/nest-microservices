import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";
import { GetUserByIdQuery } from "../impl/get-user-by-id.query";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {

  constructor(private readonly UserRepository: UserRepository) { }

  async execute(query: GetUserByIdQuery): Promise<any> {
    Logger.log('Async GetUserByIdQuery...', 'GetUserByIdHandler');
    return this.UserRepository.findUserById(query._id);
  }

} 