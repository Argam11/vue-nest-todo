import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-dto";
import { LoginPipe } from "./pipes/login.pipe";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body(LoginPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.authService.login(loginDto);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax", // Allows cookies to be sent with cross-site requests on localhost
      secure: false, // Set to true in production with HTTPS
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Login successful",
    };
  }

  @Get("me")
  async me(@Req() req: Request) {
    const access_token = req.cookies.access_token;
    const user = await this.authService.me(access_token);

    return user;
  }
}
