import { Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("/login")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  login(): string {
    return this.appService.login();
  }
}
