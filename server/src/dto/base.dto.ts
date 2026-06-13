import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { IBaseResponse } from "../types";

export class BaseResponseDto implements IBaseResponse {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  message: string;
}
