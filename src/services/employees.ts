import { request } from "@/services/request";
import type {
  CreateEmployeeInput,
  Employee,
  UpdateEmployeeInput,
} from "@/types/employees";

interface GetEmployeesResponse {
  employees: Employee[];
}

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await request<void, GetEmployeesResponse>({
    method: "GET",
    path: "employees",
  });

  return response.employees;
};

export const createEmployee = async (
  input: CreateEmployeeInput,
): Promise<{ employee: Employee }> => {
  return request<CreateEmployeeInput, { employee: Employee }>({
    method: "POST",
    path: "employees",
    input,
  });
};

export const updateEmployee = async (
  input: UpdateEmployeeInput,
): Promise<{ employee: Employee }> => {
  return request<CreateEmployeeInput, { employee: Employee }>({
    method: "PUT",
    path: `employees/${input.id}`,
    input: {
      name: input.name,
      email: input.email,
      position: input.position,
      companyId: input.companyId,
    },
  });
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await request<void, void>({
    path: `employees/${id}`,
    method: "DELETE",
  });
};
