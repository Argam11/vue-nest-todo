import { request, requestWithFormData } from "@/services/request";
import type { Company } from "@/types/companies";
import type { CreateCompanyInput } from "@/types/companies";

interface GetCompaniesResponse {
  companies: Company[];
}

export const getCompanies = async (): Promise<Company[]> => {
  const response = await request<GetCompaniesResponse>({
    method: "GET",
    path: "companies",
  });

  return response.companies;
};

export const createCompany = async (
  input: CreateCompanyInput,
): Promise<Company> => {
  return requestWithFormData<Company>("companies", {
    name: input.name,
    email: input.email,
    website: input.website,
    logo: input.logo,
  });
};
