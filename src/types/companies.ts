export interface Company {
  _id: string;
  name: string;
  logo: string; // Full URL from backend
  email: string;
  website: string;
}

export interface CompaniesState {
  companies: Company[];
  company: Company | null;
  error: boolean;
}

export interface CreateCompanyInput {
  name: string;
  email: string;
  website: string;
  logo: File | null;
}

export interface UpdateCompanyInput extends CreateCompanyInput {
  id: string;
}
