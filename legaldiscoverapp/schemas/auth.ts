import { z } from "zod";

// signin
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type SignInSchema = z.infer<typeof signInSchema>;

// signup
export const signUpSchema = z
  .object({
    name: z.string().min(1, "Full Name is required."),
    address: z.string().min(1, "Address is required."),
    company: z.string().min(1, "Company Name is required."),
    phone: z
      .string()
      .min(1, "Phone number is required.")
      .refine(
        (val) => {
          const cleaned = val.replace(/[\s\-\(\)]/g, "");
          return /^\+1\d{10}$/.test(cleaned);
        },
        {
          message:
            "Phone number must start with +1 and contain 10 digits",
        }
      ),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

// confirm signup
export const confirmSignUpSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  code: z.string().min(6, "Verification code must be at least 6 digits."),
});

export type ConfirmSignUpSchema = z.infer<typeof confirmSignUpSchema>;
