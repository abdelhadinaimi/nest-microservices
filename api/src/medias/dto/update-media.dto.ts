import { IsString, IsMongoId, IsOptional, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ICreator } from '../interfaces/creator.interface';

export class UpdateMediaDto {
  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  categorie: string;
}