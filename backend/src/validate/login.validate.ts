import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Username cannot be empty")
        .trim(),

    password: z
        .string()
        .min(1, "Password cannot be empty")
});

export type LoginInput = z.infer<typeof loginSchema>;