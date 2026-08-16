import {
  IsDate,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { Expose, Type } from "class-transformer";
import { BaseResponseDto } from "@/dto/base.dto";
import { IEmployeeResponse, IEmployeeWithCompanyName } from "../types";

export class EmployeeDto implements IEmployeeWithCompanyName {
  @Expose()
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  position!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  updatedAt!: Date;
}

export class EmployeeResponseDto
  extends BaseResponseDto
  implements IEmployeeResponse
{
  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => EmployeeDto)
  employee!: IEmployeeWithCompanyName;
}
