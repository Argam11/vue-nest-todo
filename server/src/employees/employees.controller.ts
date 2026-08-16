import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
  Param,
  ValidationPipe,
  HttpStatus,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AuthGuard } from "@/auth/auth.guard";
import { EmployeesService } from "@/employees/employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmployeesResponseDto } from "./dto/employees.dto";
import { EmployeeResponseDto } from "./dto/employee.dto";

@UseGuards(AuthGuard)
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getEmployees(): Promise<EmployeesResponseDto> {
    const employees = await this.employeesService.getEmployees();

    return plainToInstance(EmployeesResponseDto, {
      employees,
      statusCode: HttpStatus.OK,
      message: "Employees fetched successfully",
    });
  }

  @Post()
  async createEmployee(
    @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    const newEmployee = await this.employeesService.createEmployee(
      createEmployeeDto.name,
      createEmployeeDto.email,
      createEmployeeDto.position,
      createEmployeeDto.companyId,
    );

    return plainToInstance(EmployeeResponseDto, {
      employee: newEmployee,
      statusCode: HttpStatus.CREATED,
      message: "Employee created successfully",
    });
  }

  @Put(":id")
  async updateEmployee(
    @Param("id") id: string,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    const employee = await this.employeesService.updateEmployee(
      id,
      updateEmployeeDto.name,
      updateEmployeeDto.email,
      updateEmployeeDto.position,
      updateEmployeeDto.companyId,
    );

    return plainToInstance(EmployeeResponseDto, {
      employee,
      statusCode: HttpStatus.OK,
      message: "Employee updated successfully",
    });
  }

  @Delete(":id")
  async deleteEmployee(@Param("id") id: string): Promise<EmployeeResponseDto> {
    await this.employeesService.deleteEmployee(id);

    return plainToInstance(EmployeeResponseDto, {
      statusCode: HttpStatus.OK,
      message: "Employee deleted successfully",
    });
  }
}
