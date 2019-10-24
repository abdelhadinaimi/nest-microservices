import { IsString, IsMongoId, IsOptional, ValidateNested } from 'class-validator';

export class UpdateMediaDto {
  @IsMongoId()
  _id!: string;

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