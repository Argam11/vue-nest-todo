import {
  Body,
  Controller,
  Header,
  Headers,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const access_token = await this.authService.login(loginDto);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Login successful",
    };
  }
}
