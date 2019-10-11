import { IsString, } from 'class-validator';

export class CreateMediaDto {

  @IsString()
  title!: string;

  @IsString()
  description!: string;
}