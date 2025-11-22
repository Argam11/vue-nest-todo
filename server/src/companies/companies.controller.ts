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
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@/auth/auth.guard";
import { CompaniesService } from "@/companies/companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { validateImageFile } from "./companies.utils";

@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getCompanies() {
    return this.companiesService.getCompanies();
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("img"))
  createCompany(
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    validateImageFile(file);

    return this.companiesService.createCompany(
      file.filename,
      createCompanyDto.name,
      createCompanyDto.email,
      createCompanyDto.website,
    );
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  @UseInterceptors(FileInterceptor("img"))
  updateCompany(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    validateImageFile(file);
    return this.companiesService.updateCompany(
      id,
      updateCompanyDto.name,
      file.filename,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  deleteCompany(@Param("id") id: string) {
    return this.companiesService.deleteCompany(id);
  }
}
