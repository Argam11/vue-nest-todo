import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { URL_PATTERN } from "@/constants";

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(URL_PATTERN, { message: "Invalid website URL" })
  website: string;
}
