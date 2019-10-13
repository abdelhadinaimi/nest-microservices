import { IsString, IsUUID, IsMongoId } from 'class-validator';

export class CreateMediaDto {

  @IsMongoId()
  _id: string;
  
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}