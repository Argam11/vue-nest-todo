import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ICompanyEntity } from "../types";

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company implements ICompanyEntity<Types.ObjectId> {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  logo: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  website: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
