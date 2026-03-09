import { z } from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username must be less than 20 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and _")
            .trim(),

        email: z
            .string()
            .email("Invalid email format")
            .toLowerCase()
            .trim(),

        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters")
            .max(50)
            .trim(),

        lastName: z
            .string()
            .min(2, "Last name must be at least 2 characters")
            .max(50)
            .trim(),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100)
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),

        confirmPassword: z.string({
            error: "Confirm password is required",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;