import { IsMongoId, IsString, IsUrl, IsDefined } from "class-validator";
import { ICreator } from "./creator.interface";

export interface ICreator {
  _id: string;
  username: string;
}

export class Creator implements ICreator {
  @IsDefined()
  @IsMongoId()
  _id!: string;

  @IsString()
  username!: string;

}