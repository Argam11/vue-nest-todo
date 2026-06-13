import { PipeTransform, Injectable } from "@nestjs/common";
import { ILoginRequest } from "../types";

@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: ILoginRequest) {
    return value;
  }
}
