import { BadRequestException, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { ILoginRequest } from "./types";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginRequest: ILoginRequest) {
    const user = await this.userModel.findOne({ username: loginRequest.username });

    if (!user) {
      throw new BadRequestException("Credentials incorrect");
    }

    const match = await compare(loginRequest.password, user.password);

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
}
