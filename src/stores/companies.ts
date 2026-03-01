import { defineStore } from "pinia";
import type { CompaniesState } from "@/types/companies";
import { getCompanies, getCompany, createCompany } from "@/services/companies";
import type { CreateCompanyInput } from "@/types/companies";

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
  },
});
