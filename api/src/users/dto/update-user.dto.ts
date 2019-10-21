import { IsString, IsEmail, IsOptional } from 'class-validator';


export class UpdateUserDto {
  
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  avatarURL: string;
  
  @IsOptional()
  @IsString()
  profilBio: string;
}