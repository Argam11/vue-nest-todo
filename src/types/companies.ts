export interface Company {
  _id: string;
  name: string;
  img: string; // Full URL from backend
  email: string;
  website: string;
}

export interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null;
}

