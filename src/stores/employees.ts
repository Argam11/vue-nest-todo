import { defineStore } from "pinia";
import type {
  CreateEmployeeInput,
  EmployeesState,
  UpdateEmployeeInput,
} from "@/types/employees";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/services/employees";

export const useEmployeesStore = defineStore("employees", {
  state: (): EmployeesState => ({
    employees: [],
    error: false,
  }),
  actions: {
    async fetchEmployees() {
      try {
        this.error = false;
        const employees = await getEmployees();
        this.employees = employees;
      } catch {
        this.error = true;
      }
    },

    async createEmployee(input: CreateEmployeeInput) {
      const { employee } = await createEmployee(input);
      this.employees.unshift(employee);
    },

    async updateEmployee(input: UpdateEmployeeInput) {
      const { employee } = await updateEmployee(input);
      const index = this.employees.findIndex((e) => e._id === input.id);
      if (index !== -1) {
        this.employees[index] = employee;
      }
    },

    async deleteEmployee(id: string) {
      await deleteEmployee(id);
      this.employees = this.employees.filter((e) => e._id !== id);
    },
  },
});
