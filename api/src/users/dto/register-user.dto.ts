import { IsString, IsEmail, IsOptional } from 'class-validator';

export class RegisterUserDto {

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