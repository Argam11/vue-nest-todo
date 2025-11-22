import { request } from "@/services/request";
import type { Company } from "@/types/companies";

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
