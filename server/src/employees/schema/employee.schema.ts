import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { IEmployeeEntity } from "../types";

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee implements IEmployeeEntity<Types.ObjectId> {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String, required: true })
  position!: string;

  @Prop({ type: Types.ObjectId, ref: "Company", required: true })
  companyId!: Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
