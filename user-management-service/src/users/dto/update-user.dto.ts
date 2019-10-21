import { IsString, IsMongoId, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {

  @IsMongoId()
  _id!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  avatarURL?: string;
  
  @IsOptional()
  @IsString()
  profilBio?: string;
}