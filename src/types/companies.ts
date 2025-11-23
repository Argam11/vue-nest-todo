export interface Company {
  _id: string;
  name: string;
  logo: string; // Full URL from backend
  email: string;
  website: string;
}

export interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null;
}

export interface CreateCompanyInput {
  name: string;
  email: string;
  website: string;
  logo: File | null;
}
