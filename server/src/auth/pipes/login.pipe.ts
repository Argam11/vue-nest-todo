import { PipeTransform, Injectable } from "@nestjs/common";
import { LoginDto } from "../dto/login-dto";

@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: LoginDto) {
    return value;
  }
}
