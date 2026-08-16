import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { BaseResponseDto } from "@/dto/base.dto";
import { IEmployeesResponse, IEmployeeWithCompanyName } from "../types";
import { EmployeeDto } from "./employee.dto";

export class EmployeesResponseDto
  extends BaseResponseDto
  implements IEmployeesResponse
{
  @Expose()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EmployeeDto)
  employees!: IEmployeeWithCompanyName[];
}
