import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class UpdateCompanyDto {
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
