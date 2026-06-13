import { defineStore } from "pinia";
import type {
  CompaniesState,
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/types/companies";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/services/companies";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesState => ({
    companies: [],
    company: null,
    error: false,
  }),
  actions: {
    async fetchCompanies() {
      try {
        this.error = false;
        const companies = await getCompanies();
        this.companies = companies;
      } catch {
        this.error = true;
      }
    },

    setCompany(company: Company) {
      this.company = company;
    },

    async createCompany(input: CreateCompanyInput) {
      const { company } = await createCompany(input);
      this.companies.unshift(company);
    },

    async updateCompany(input: UpdateCompanyInput) {
      const { company } = await updateCompany(input);
      const index = this.companies.findIndex((c) => c._id === input.id);
      if (index !== -1) {
        this.companies[index] = company;
      }
    },

    async deleteCompany(id: string) {
      await deleteCompany(id);
      this.companies = this.companies.filter((c) => c._id !== id);
    },
  },
});
