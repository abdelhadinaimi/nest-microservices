import { ICommand } from "@nestjs/cqrs";
import { UpdateMediaDto } from "../../dto/update-media.dto";

export class UpdateMediaCommand implements ICommand {
  constructor(
    public readonly updateMediaDto: UpdateMediaDto,
  ) { }
}
