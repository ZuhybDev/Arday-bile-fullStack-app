// validation/registerSchema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const schoolName = z.object({
  name: z
    .string()
    .min(5, "School name must be at least 5 characters")
    .max(100, "School name must be at most 100 characters"),
});
