import { IsString, IsOptional, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { Creator } from '../interfaces/creator.interface';

export class CreateMediaDto {

  @IsDefined()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  categorie?: string;

  @ValidateNested()
  @IsDefined()
  @Type(() => Creator)
  creator!: Creator;
}