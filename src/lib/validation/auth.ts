import { z } from "zod";

export const userTypeSchema = z.enum(["model", "photographer"]);
export type UserType = z.infer<typeof userTypeSchema>;

export const signUpSchema = z
  .object({
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
    displayName: z
      .string()
      .trim()
      .min(2, "Display name must be at least 2 characters.")
      .max(60, "Display name must be 60 characters or fewer."),
    userType: userTypeSchema,
    // A plain boolean so we control the error message ourselves — the
    // checkbox must be checked, "false" is not an acceptable value.
    ageConfirmed: z.boolean().refine((value) => value === true, {
      message: "You must confirm you are 18 or older to create an account.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginInput = z.infer<typeof loginSchema>;
