import { IsMongoId, IsDefined, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";
import { ICreator } from "../interfaces/creator.interface";
import { Type } from "class-transformer";

class Creator implements ICreator {
  @IsOptional()
  @IsMongoId()
  _id!: string;

  @IsOptional()
  @IsString()
  username!: string;

  @IsOptional()
  @IsUrl()
  avatarURL!: string;
}

export class UpdateMediaCreatorDto {
  @IsMongoId()
  _id!: string;

  @IsOptional()
  @ValidateNested()  
  @Type(() => Creator)
  creator: Creator;
  
}