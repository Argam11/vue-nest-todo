import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop()
  name: string;

  @Prop()
  img: string;

  @Prop()
  email: string;

  @Prop()
  website: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
