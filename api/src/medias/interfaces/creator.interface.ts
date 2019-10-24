import { IsMongoId, IsString, IsUrl, IsDefined } from "class-validator";
import { ICreator } from "./creator.interface";

export interface ICreator {
  readonly _id: string;
  readonly username: string;
  readonly avatarURL: string;
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