import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
});

export const getOptionalSession = cache(async () => {
  return getSession();
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, balance: true, isAdmin: true },
  });
  if (!user) {
    redirect("/login");
  }
  return user;
});

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user.isAdmin) {
    redirect("/dashboard");
  }
  return user;
}
