import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("asd")
  login(): string {
    console.log("asd11");

    return "111";
  }
}
