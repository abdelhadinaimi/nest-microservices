import { IsString, IsMongoId, IsEmail } from 'class-validator';

export class UpdateUserDto {

  @IsMongoId()
  _id!: string;
  
  @IsString()
  lastname: string;
  @IsEmail()
  email: string;
}