import { IBaseEntity, IBaseResponse } from "../../types";

export interface IEmployeeEntity<T = string> extends IBaseEntity<T> {
  name: string;
  email: string;
  position: string;
  companyId: T;
}

// Employee entity enriched with the referenced company's name, as returned
// by the "list employees" endpoint (companyId is populated under the hood)
export interface IEmployeeWithCompanyName extends IEmployeeEntity {
  companyName: string;
}

export interface IEmployeesResponse extends IBaseResponse {
  employees: IEmployeeWithCompanyName[];
}

export interface IEmployeeResponse extends IBaseResponse {
  employee: IEmployeeWithCompanyName;
}
