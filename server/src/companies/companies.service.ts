import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import * as path from "path";
import { Company, CompanyDocument } from "./schema/company.schema";
import { UPLOAD_DIR, DEFAULT_COMPANY_LOGO } from "./companies.constants";
import { deleteFileIfExists, getImageUrl } from "./companies.utils";

@Injectable()
export class CompaniesService {
  private readonly appUrl: string;

  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private configService: ConfigService,
  ) {
    this.appUrl = this.configService.get<string>("APP_URL");
  }

  /**
   * Get all companies with absolute image URLs
   * Sorted by newest first (createdAt descending)
   */
  async getCompanies() {
    const companies = await this.companyModel
      .find({})
      .sort({ createdAt: -1 })
      .exec();

    return {
      companies: companies.map((company) => ({
        _id: company._id,
        name: company.name,
        email: company.email,
        website: company.website,
        logo: getImageUrl(this.appUrl, company.logo),
      })),
    };
  }

  /**
   * Create a new company
   * If no filename is provided, uses default fallback logo
   */
  async createCompany(
    filename: string | null,
    name: string,
    email: string,
    website: string,
  ) {
    const company = await this.companyModel.create({
      logo: filename || DEFAULT_COMPANY_LOGO,
      name,
      email,
      website,
    });

    return {
      _id: company._id,
      name: company.name,
      email: company.email,
      website: company.website,
      logo: getImageUrl(this.appUrl, company.logo),
    };
  }

  /**
   * Update an existing company
   */
  async updateCompany(id: string, name: string, filename: string) {
    const company = await this.companyModel.findById(id).exec();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    // Delete old image file
    const oldImagePath = path.join(UPLOAD_DIR, company.logo);
    deleteFileIfExists(oldImagePath);

    // Update company
    company.name = name;
    company.logo = filename;
    await company.save();

    return {
      _id: company._id,
      name: company.name,
      logo: getImageUrl(this.appUrl, company.logo),
    };
  }

  /**
   * Delete a company
   */
  async deleteCompany(id: string) {
    const company = await this.companyModel.findById(id).exec();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    // Delete image file
    const imagePath = path.join(UPLOAD_DIR, company.logo);
    deleteFileIfExists(imagePath);

    // Delete company from database
    await this.companyModel.findByIdAndDelete(id).exec();

    return {
      message: "Company deleted successfully",
    };
  }
}
