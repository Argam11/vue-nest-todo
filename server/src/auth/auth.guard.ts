import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "@/constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const access_token = request.cookies.access_token;

    if (!access_token) {
      throw new UnauthorizedException();
    }

    const secret = this.configService.get<string>(JWT_SECRET);

    try {
      const user = await this.jwtService.verifyAsync(access_token, {
        secret,
      });

      request["user"] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
