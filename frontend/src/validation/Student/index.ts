import { z } from "zod";

// student
export const studentSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 charecters")
    .max(100, "Name must at most 20 charectors"),
  password: z
    .string()
    .min(5, "Password must be at least 5 charectors")
    .max(8, "Password is too long"),
  className: z.string().min(1, "Name must be at least 1 charecters"),
});

const emptyOrMin = (min: number) =>
  z.string().refine((val) => val.length === 0 || val.length >= min, {
    message: `Must be empty or at least ${min} characters`,
  });

export const updateStudentSchema = z.object({
  name: emptyOrMin(4),
  password: emptyOrMin(5),
  className: emptyOrMin(1),
});

// subjects

export const subjectSchema = z.object({
  name: z
    .string()
    .min(3, "Subject name must be at least 3 characters")
    .max(20, "Subject name is too long"),

  passMark: z
    .string()
    .min(1, "Full marks is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 100,
      {
        message: "Full marks must be a number between 1 and 100",
      }
    ),
});

export const updateSubjectSchema = z.object({
  name: emptyOrMin(2),
  passMark: emptyOrMin(1),
});
