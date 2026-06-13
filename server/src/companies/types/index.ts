import { IBaseEntity, IBaseResponse } from "../../types";

export interface ICompanyEntity<T = string> extends IBaseEntity<T> {
  name: string;
  logo: string;
  email: string;
  website: string;
}

export interface ICompaniesResponse extends IBaseResponse {
  companies: ICompanyEntity[];
}

export interface ICompanyResponse extends IBaseResponse {
  company: ICompanyEntity;
}
