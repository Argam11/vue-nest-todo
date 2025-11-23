import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import type { CompaniesState } from "@/types/companies";
import { getCompanies, createCompany } from "@/services/companies";
import type { CreateCompanyInput } from "@/types/companies";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesState => ({
    companies: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCompanies() {
      this.loading = true;
      this.error = null;

      try {
        const companies = await getCompanies();
        this.companies = companies;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch companies";
        this.error = errorMessage;
        toast.error(errorMessage);
      } finally {
        this.loading = false;
      }
    },

    async createCompany(input: CreateCompanyInput) {
      this.error = null;

      try {
        const newCompany = await createCompany(input);

        // Add new company to the list
        this.companies.unshift(newCompany);

        return newCompany;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create company";
        this.error = errorMessage;
        throw error;
      }
    },
  },
});
