import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, "Username needs to be at least 2 characters."),
  password: z
    .string()
    .min(8, "Password needs to be at least 8 characters."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

