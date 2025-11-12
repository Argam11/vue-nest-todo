import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { LoginDto } from "./dto/login-dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ username: loginDto.username });

    if (!user) {
      throw new BadRequestException("Credentials incorrect");
    }

    const match = await compare(loginDto.password, user.password);

    if (!match) {
      throw new BadRequestException("Credentials incorrect");
    }

    const payload = { sub: user._id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      username: user.username,
    };
  }

  async me(access_token: string) {
    const payload = await this.jwtService.verifyAsync(access_token);

    return {
      username: payload.username,
    };
  }
}
