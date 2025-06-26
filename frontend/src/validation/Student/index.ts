import { z } from "zod";

export const studentSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 charecters")
    .max(20, "Name must at most 20 charectors"),
  password: z
    .string()
    .min(5, "Password must be at least 5 charectors")
    .max(8, "Password is too long"),
  className: z.string().min(1, "Name must be at least 1 charecters"),
});
