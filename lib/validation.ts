import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const TransferSchema = z.object({
  receiverUsername: z.string().trim().min(1, "Receiver username is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
});

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters"),
});
