import { IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { ILoginRequest, ILoginResponse } from "../types";
import { BaseResponseDto } from "../../dto/base.dto";

export class LoginRequestDto implements ILoginRequest {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto extends BaseResponseDto implements ILoginResponse {
  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;
}
