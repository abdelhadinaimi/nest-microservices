import { IsString, IsMongoId, } from 'class-validator';

export class UpdateMediaDto {

  @IsString()
  title: string;

  @IsString()
  description: string;
}