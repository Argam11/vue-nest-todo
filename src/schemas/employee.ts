import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => z.email().safeParse(value).success,
      "Invalid email format",
    ),
  position: z.string().min(1, "Position is required"),
  companyId: z.string().min(1, "Company is required"),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
