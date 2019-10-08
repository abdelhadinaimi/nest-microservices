import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetUsersQuery } from "../impl";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersHandler> {
  
  constructor(private readonly userRepository: UserRepository) {}
  
  async execute(query: GetUsersHandler): Promise<any> {
    Logger.log('Async GetUsersQuery...','GetUsersHandler');
    return this.userRepository.findAll();
  }

} 