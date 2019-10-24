import { IsMongoId, IsString, IsUrl, IsDefined } from "class-validator";
import { ICreator } from "./creator.interface";

export interface ICreator {
  _id: string;
  username: string;
  avatarURL: string;
}

export class Creator implements ICreator {
  @IsDefined()
  @IsMongoId()
  _id!: string;

  @IsDefined()
  @IsString()
  username!: string;

  @IsDefined()
  @IsUrl()
  avatarURL!: string;
}