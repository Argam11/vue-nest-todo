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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-dto";
import { LoginPipe } from "./pipes/login.pipe";
import { AuthGuard } from "./auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 200 },
        message: { type: "string", example: "Login successful" },
        username: { type: "string", example: "johndoe" },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
  })
  async login(
    @Body(LoginPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, username } = await this.authService.login(loginDto);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Login successful",
      username,
    };
  }

  @Post("logout")
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({
    status: 200,
    description: "Logout successful",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 200 },
        message: { type: "string", example: "Logout successful" },
      },
    },
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token", {
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Logout successful",
    };
  }

  @UseGuards(AuthGuard)
  @Get("me")
  @ApiOperation({ summary: "Get current user information" })
  @ApiCookieAuth("access_token")
  @ApiResponse({
    status: 200,
    description: "User information retrieved successfully",
    schema: {
      type: "object",
      properties: {
        username: { type: "string", example: "johndoe" },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing access token",
  })
  async me(@Req() req: Request) {
    return {
      username: req.user.username,
    };
  }
}
