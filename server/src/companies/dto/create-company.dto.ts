import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsNotEmpty()
  website: string;
}
