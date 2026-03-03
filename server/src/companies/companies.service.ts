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
   * Get a company by ID
   */
  async getCompany(id: string) {
    const company = await this.companyModel.findById(id).exec();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return {
      _id: company._id,
      name: company.name,
      email: company.email,
      website: company.website,
      logo: getImageUrl(this.appUrl, company.logo),
    };
  }

  /**
   * Create a new company
   * If no filename is provided, uses default fallback logo
   */
  async createCompany(
    logo: string,
    name: string,
    email: string,
    website: string,
  ) {
    const company = await this.companyModel.create({
      logo: logo || DEFAULT_COMPANY_LOGO,
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
  async updateCompany(
    id: string,
    name: string,
    email: string,
    website: string,
    logo?: string,
  ) {
    const company = await this.companyModel.findById(id).exec();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    const updateData: Record<string, string> = { name, email, website };

    if (logo) {
      if (company.logo && company.logo !== DEFAULT_COMPANY_LOGO) {
        const oldImagePath = path.join(UPLOAD_DIR, company.logo);
        deleteFileIfExists(oldImagePath);
      }
      updateData.logo = logo;
    }

    const updatedCompany = await this.companyModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    return {
      _id: updatedCompany._id,
      name: updatedCompany.name,
      email: updatedCompany.email,
      website: updatedCompany.website,
      logo: getImageUrl(this.appUrl, updatedCompany.logo),
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
