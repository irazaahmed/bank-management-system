"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { verifySession } from "@/lib/dal";
import {
  RegisterSchema,
  LoginSchema,
  ChangePasswordSchema,
} from "@/lib/validation";

export type ActionState = { error?: string; success?: string } | undefined;

export async function registerAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = RegisterSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { username, password } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
  });
  if (existing) {
    return { error: "Username already registered" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, passwordHash },
  });

  await createSession({
    userId: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
  redirect("/dashboard");
}

export async function loginAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { username, password } = parsed.data;

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
  });
  if (!user) {
    return { error: "Invalid username or password" };
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid username or password" };
  }

  await createSession({
    userId: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
  redirect(user.isAdmin ? "/admin" : "/dashboard");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}

export async function changePasswordAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  const parsed = ChangePasswordSchema.safeParse({
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { oldPassword, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  if (!user) {
    return { error: "User not found" };
  }
  const valid = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect" };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  return { success: "Password updated successfully" };
}
