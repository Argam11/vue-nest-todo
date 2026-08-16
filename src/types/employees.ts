export interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  companyId: string;
  companyName: string;
}

export interface EmployeesState {
  employees: Employee[];
  error: boolean;
}

export interface CreateEmployeeInput {
  name: string;
  email: string;
  position: string;
  companyId: string;
}

export interface UpdateEmployeeInput extends CreateEmployeeInput {
  id: string;
}
