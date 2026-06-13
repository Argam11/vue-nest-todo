import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { AuthService } from "./auth.service";
import { LoginRequestDto, LoginResponseDto } from "./dto/login.dto";
import { LoginPipe } from "./pipes/login.pipe";
import { AuthGuard } from "./auth.guard";
import { BaseResponseDto } from "@/dto/base.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body(LoginPipe) loginDto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const { access_token, username } = await this.authService.login(loginDto);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return plainToInstance(LoginResponseDto, {
      statusCode: HttpStatus.OK,
      message: "Login successful",
      username,
    });
  }

  @Post("logout")
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<BaseResponseDto> {
    res.clearCookie("access_token", {
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return plainToInstance(BaseResponseDto, {
      statusCode: HttpStatus.OK,
      message: "Logout successful",
    });
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async me(@Req() req: Request): Promise<LoginResponseDto> {
    return plainToInstance(LoginResponseDto, {
      statusCode: HttpStatus.OK,
      message: "Me successful",
      username: req.user.username,
    });
  }
}
