import { IsString, IsMongoId } from 'class-validator';

export class UpdateMediaDto {

  @IsMongoId()
  _id!: string;
  
  @IsString()
  title: string;

  @IsString()
  description: string;
}