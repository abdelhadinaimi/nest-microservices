import { IsMongoId, IsDefined, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";
import { ICreator, Creator } from "../interfaces/creator.interface";
import { Type } from "class-transformer";

export class UpdateCreatorDto {
 
  @ValidateNested()  
  @Type(() => Creator)
  creator: Creator;
  
}