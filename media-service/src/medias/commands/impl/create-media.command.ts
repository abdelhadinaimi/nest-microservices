import { ICommand } from "@nestjs/cqrs";
import { CreateMediaDto } from "../../dto/create-media.dto";

export class CreateMediaCommand implements ICommand {
  constructor(
    public readonly createMediaDto: CreateMediaDto,
  ) { }
}