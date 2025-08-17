import { ForbiddenException, Injectable } from "@nestjs/common";
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
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ username: loginDto.username });

    if (!user) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const match = await compare(loginDto.password, user.password);

    if (!match) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const payload = { sub: user._id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
