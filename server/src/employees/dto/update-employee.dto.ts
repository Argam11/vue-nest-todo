import { IsEmail, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class UpdateEmployeeDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  position!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  companyId!: string;
}
