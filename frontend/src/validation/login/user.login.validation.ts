import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Eamil is required" })
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
