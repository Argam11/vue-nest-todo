import { IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { ICompanyEntity, ICompanyResponse } from "../types";
import { BaseResponseDto } from "@/dto/base.dto";

export class CompanyDto implements ICompanyEntity {
  @Expose()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  logo: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  website: string;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

export class CompanyResponseDto
  extends BaseResponseDto
  implements ICompanyResponse
{
  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CompanyDto)
  company: ICompanyEntity;
}
