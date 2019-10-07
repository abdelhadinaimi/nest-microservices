import { IsString, IsEmail } from 'class-validator';

export class UserIdRequestParamsDto {
  @IsString()
  userId!: string;
}

export class UserDto {
  @IsString()
  userId: string;
  @IsString()
  firstname!: string;
  @IsString()
  lastname!: string;
  @IsEmail()
  email!: string;
}