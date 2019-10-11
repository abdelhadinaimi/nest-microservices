import { IsString } from 'class-validator';

export class MediaIdRequestParamsDto {
  @IsString()
  mediaId!: string;
}

export class MediaDto {
  @IsString()
  mediaId: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;
}