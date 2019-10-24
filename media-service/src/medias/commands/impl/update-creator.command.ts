import { ICommand } from "@nestjs/cqrs";
import { UpdateCreatorDto } from "../../dto/update-creator.dto";

export class UpdateCreatorCommand implements ICommand {
  constructor(
    public readonly updateCreatorDto: UpdateCreatorDto,
  ) { }
}
