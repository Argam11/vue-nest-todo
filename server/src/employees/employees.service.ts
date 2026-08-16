import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Employee, EmployeeDocument } from "./schema/employee.schema";
import { IEmployeeWithCompanyName } from "./types";

interface PopulatedCompany {
  _id: Types.ObjectId;
  name: string;
}

type EmployeeWithPopulatedCompany = Omit<
  Employee & { _id: Types.ObjectId },
  "companyId"
> & { companyId: PopulatedCompany };

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
  ) {}

  /**
   * Maps a lean, company-populated employee document to the API entity shape
   */
  private toEmployeeEntity(
    employee: EmployeeWithPopulatedCompany,
  ): IEmployeeWithCompanyName {
    return {
      ...employee,
      _id: employee._id.toString(),
      companyId: employee.companyId._id.toString(),
      companyName: employee.companyId.name,
    };
  }

  /**
   * Get all employees with their company name
   * Sorted by newest first (createdAt descending)
   */
  async getEmployees(): Promise<IEmployeeWithCompanyName[]> {
    const employees = await this.employeeModel
      .find({})
      .sort({ createdAt: -1 })
      .populate<{ companyId: PopulatedCompany }>("companyId", "name")
      .lean()
      .exec();

    return employees.map((employee) => this.toEmployeeEntity(employee));
  }

  /**
   * Create a new employee
   */
  async createEmployee(
    name: string,
    email: string,
    position: string,
    companyId: string,
  ): Promise<IEmployeeWithCompanyName> {
    const employee = await this.employeeModel.create({
      name,
      email,
      position,
      companyId,
    });

    const createdEmployee = await this.employeeModel
      .findById(employee._id)
      .populate<{ companyId: PopulatedCompany }>("companyId", "name")
      .lean()
      .exec();

    if (!createdEmployee) {
      throw new NotFoundException(`Employee with ID ${employee._id} not found`);
    }

    return this.toEmployeeEntity(createdEmployee);
  }

  /**
   * Update an existing employee
   */
  async updateEmployee(
    id: string,
    name: string,
    email: string,
    position: string,
    companyId: string,
  ): Promise<IEmployeeWithCompanyName> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(
        id,
        { name, email, position, companyId },
        { new: true },
      )
      .populate<{ companyId: PopulatedCompany }>("companyId", "name")
      .lean()
      .exec();

    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.toEmployeeEntity(updatedEmployee);
  }

  /**
   * Delete an employee
   */
  async deleteEmployee(id: string): Promise<{ message: string }> {
    const employee = await this.employeeModel.findById(id).lean().exec();

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    await this.employeeModel.findByIdAndDelete(id);

    return {
      message: "Employee deleted successfully",
    };
  }
}
