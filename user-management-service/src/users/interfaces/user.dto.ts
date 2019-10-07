import { IsString } from 'class-validator';

export class UserIdRequestParamsDto {
  @IsString()
  userId!: string;
}

export class UserDto {
  @IsString()
  userId!: string;
  @IsString()
  firstName!: string;
  @IsString()
  lastName!: string;
}