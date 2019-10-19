import { IsString, IsEmail } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  firstname!: string;

  @IsString()
  lastname!: string;
  
  @IsEmail()
  email!: string;
}