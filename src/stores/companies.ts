import { defineStore } from "pinia";
import type {
  CompaniesState,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/types/companies";
import {
  getCompanies,
  getCompany,
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

    async fetchCompany(id: string) {
      const company = await getCompany(id);
      this.company = company;
    },

    async createCompany(input: CreateCompanyInput) {
      const newCompany = await createCompany(input);
      this.companies.unshift(newCompany);
    },

    async updateCompany(input: UpdateCompanyInput) {
      const updated = await updateCompany(input);
      const index = this.companies.findIndex((c) => c._id === input.id);
      if (index !== -1) {
        this.companies[index] = updated;
      }
    },

    async deleteCompany(id: string) {
      await deleteCompany(id);
      this.companies = this.companies.filter((c) => c._id !== id);
    },
  },
});
