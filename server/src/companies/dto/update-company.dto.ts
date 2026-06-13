import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Expose } from "class-transformer";
import { URL_PATTERN } from "@/constants";

export class UpdateCompanyDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Matches(URL_PATTERN, { message: "Invalid website URL" })
  website: string;
}
