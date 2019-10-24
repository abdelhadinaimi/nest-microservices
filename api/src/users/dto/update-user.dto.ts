import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';


export class UpdateUserDto {

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @MaxLength(20, {
    message: "firstname is too long"
  })
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  avatarURL: string;

  @MaxLength(512, {
    message: "bio is too long"
  })
  @IsOptional()
  @IsString()
  profilBio: string;
}