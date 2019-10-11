import { ICommand } from "@nestjs/cqrs";
import { MediaDto } from "../../interfaces/media.dto";

export class CreateMediaCommand implements ICommand {
  constructor(
    public readonly mediaDto: MediaDto,
  ) { }
}