import { IsString, IsUUID } from 'class-validator';

export class CreateMediaDto {

  @IsUUID()
  _id: string;
  
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}