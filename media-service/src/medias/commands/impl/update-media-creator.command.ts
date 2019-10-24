import { ICommand } from "@nestjs/cqrs";
import { UpdateMediaCreatorDto } from "../../dto/update-media-creator.dto";

export class UpdateMediaCreatorCommand implements ICommand {
  constructor(
    public readonly updateMediaCreatorDto: UpdateMediaCreatorDto,
  ) { }
}
