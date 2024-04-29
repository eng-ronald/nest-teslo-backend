import { IsEmail, IsIn, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateAccountDto {

  @IsString()
  @MinLength(4)
  @IsOptional()
  contactName: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['client','supplier'])
  accountType: string;

}