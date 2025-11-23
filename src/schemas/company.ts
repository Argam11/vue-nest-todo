import { z } from "zod";

// URL validation pattern - must match backend validation
const URL_PATTERN =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

export const createCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => z.email().safeParse(value).success,
      "Invalid email format",
    ),
  website: z
    .string()
    .min(1, "Website is required")
    .regex(URL_PATTERN, "Invalid website URL"),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
