import { IsArray, IsNumber } from 'class-validator';

export class ArrayDto {

  @IsNumber(null,{each:true})
  data: number[];
}