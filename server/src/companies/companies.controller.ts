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
  HttpStatus,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { plainToInstance } from "class-transformer";
import { AuthGuard } from "@/auth/auth.guard";
import { CompaniesService } from "@/companies/companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { validateImageFile } from "./companies.utils";
import { CompaniesResponseDto } from "./dto/companies.dto";
import { CompanyResponseDto } from "./dto/company.dto";

@UseGuards(AuthGuard)
@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getCompanies(): Promise<CompaniesResponseDto> {
    const companies = await this.companiesService.getCompanies();

    return plainToInstance(CompaniesResponseDto, {
      companies,
      statusCode: HttpStatus.OK,
      message: "Companies fetched successfully",
    });
  }

  @Get(":id")
  async getCompany(@Param("id") id: string): Promise<CompanyResponseDto> {
    const company = await this.companiesService.getCompany(id);

    return plainToInstance(CompanyResponseDto, {
      company,
      statusCode: HttpStatus.OK,
      message: "Company fetched successfully",
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor("logo"))
  async createCompany(
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CompanyResponseDto> {
    validateImageFile(file);

    const newCompany = await this.companiesService.createCompany(
      file?.filename || null,
      createCompanyDto.name,
      createCompanyDto.email,
      createCompanyDto.website,
    );

    return plainToInstance(CompanyResponseDto, {
      company: newCompany,
      statusCode: HttpStatus.CREATED,
      message: "Company created successfully",
    });
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("logo"))
  async updateCompany(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CompanyResponseDto> {
    validateImageFile(file);

    const company = await this.companiesService.updateCompany(
      id,
      updateCompanyDto.name,
      updateCompanyDto.email,
      updateCompanyDto.website,
      file?.filename,
    );

    return plainToInstance(CompanyResponseDto, {
      company,
      statusCode: HttpStatus.OK,
      message: "Company updated successfully",
    });
  }

  @Delete(":id")
  async deleteCompany(@Param("id") id: string): Promise<CompanyResponseDto> {
    await this.companiesService.deleteCompany(id);

    return plainToInstance(CompanyResponseDto, {
      statusCode: HttpStatus.OK,
      message: "Company deleted successfully",
    });
  }
}
