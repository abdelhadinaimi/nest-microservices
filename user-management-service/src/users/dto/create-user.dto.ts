import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname!: string;
  @IsString()
  lastname!: string;
  @IsEmail()
  email!: string;
}