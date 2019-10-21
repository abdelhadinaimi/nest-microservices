import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  email!: string;

  @IsString()
  username!: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;
}