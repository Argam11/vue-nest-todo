import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "@/auth/auth.module";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";
import { Employee, EmployeeSchema } from "./schema/employee.schema";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
