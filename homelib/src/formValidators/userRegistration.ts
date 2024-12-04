import { z } from "zod";

// Zod schema for registration validation
export const registrationSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .refine(async (email) => await isEmailUnique(email), {
        message: "Email is already in use",
      }),    
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
  });

// Mock async uniqueness checks (replace with actual database/API checks)
const isEmailUnique = async (email: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulated delay
  return email !== "taken@example.com"; // Replace with real check
};
