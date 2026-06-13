import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { BaseResponseDto } from "@/dto/base.dto";
import { ICompaniesResponse, ICompanyEntity } from "../types";
import { CompanyDto } from "./company.dto";

export class CompaniesResponseDto
  extends BaseResponseDto
  implements ICompaniesResponse
{
  @Expose()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CompanyDto)
  companies: ICompanyEntity[];
}
