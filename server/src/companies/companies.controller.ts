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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { AuthGuard } from "@/auth/auth.guard";
import { CompaniesService } from "@/companies/companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { validateImageFile } from "./companies.utils";

@ApiTags("Companies")
@ApiCookieAuth("access_token")
@UseGuards(AuthGuard)
@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: "Get all companies" })
  @ApiResponse({
    status: 200,
    description: "List of all companies",
    schema: {
      type: "object",
      properties: {
        companies: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
              name: { type: "string", example: "Acme Corp" },
              email: { type: "string", example: "info@acme.com" },
              website: { type: "string", example: "https://acme.com" },
              logo: {
                type: "string",
                example: "http://localhost:3000/assets/uploads/logo.png",
              },
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing access token",
  })
  getCompanies() {
    return this.companiesService.getCompanies();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a company by ID" })
  @ApiParam({ name: "id", description: "Company ID" })
  @ApiResponse({
    status: 200,
    description: "Company retrieved successfully",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing access token",
  })
  getCompany(@Param("id") id: string) {
    return this.companiesService.getCompany(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor("logo"))
  @ApiOperation({ summary: "Create a new company" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Company data with optional logo file",
    schema: {
      type: "object",
      required: ["name", "email", "website"],
      properties: {
        name: { type: "string", example: "Acme Corp" },
        email: { type: "string", example: "info@acme.com" },
        website: { type: "string", example: "https://acme.com" },
        logo: { type: "string", format: "binary" },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Company created successfully",
    schema: {
      type: "object",
      properties: {
        _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
        name: { type: "string", example: "Acme Corp" },
        email: { type: "string", example: "info@acme.com" },
        website: { type: "string", example: "https://acme.com" },
        logo: {
          type: "string",
          example: "http://localhost:3000/assets/uploads/logo.png",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing access token",
  })
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
  @UseInterceptors(FileInterceptor("img"))
  @ApiOperation({ summary: "Update an existing company" })
  @ApiParam({ name: "id", description: "Company ID" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Updated company data",
    schema: {
      type: "object",
      required: ["name", "img"],
      properties: {
        name: { type: "string", example: "Acme Corp Updated" },
        email: { type: "string", example: "new@acme.com" },
        website: { type: "string", example: "https://acme.com" },
        img: { type: "string", format: "binary" },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Company updated successfully",
    schema: {
      type: "object",
      properties: {
        _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
        name: { type: "string", example: "Acme Corp Updated" },
        logo: {
          type: "string",
          example: "http://localhost:3000/assets/uploads/new-logo.png",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing access token",
  })
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

  @Delete(":id")
  @ApiOperation({ summary: "Delete a company" })
  @ApiParam({ name: "id", description: "Company ID" })
  @ApiResponse({
    status: 200,
    description: "Company deleted successfully",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Company deleted successfully" },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing access token",
  })
  deleteCompany(@Param("id") id: string) {
    return this.companiesService.deleteCompany(id);
  }
}
