import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@/auth/auth.guard";
import { CompaniesService } from "@/companies/companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { validateImageFile } from "./companies.utils";

@UseGuards(AuthGuard)
@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getCompanies() {
    return this.companiesService.getCompanies();
  }

  @Get(":id")
  getCompany(@Param("id") id: string) {
    return this.companiesService.getCompany(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor("logo"))
  async createCompany(
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    validateImageFile(file);

    return this.companiesService.createCompany(
      file?.filename || null,
      createCompanyDto.name,
      createCompanyDto.email,
      createCompanyDto.website,
    );
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("logo"))
  updateCompany(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    validateImageFile(file);

    return this.companiesService.updateCompany(
      id,
      updateCompanyDto.name,
      updateCompanyDto.email,
      updateCompanyDto.website,
      file?.filename,
    );
  }

  @Delete(":id")
  deleteCompany(@Param("id") id: string) {
    return this.companiesService.deleteCompany(id);
  }
}
