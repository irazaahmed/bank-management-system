"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession, requireAdmin } from "@/lib/dal";
import { TransferSchema } from "@/lib/validation";

export type ActionState = { error?: string; success?: string } | undefined;

export async function transferAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();

  const parsed = TransferSchema.safeParse({
    receiverUsername: formData.get("receiverUsername"),
    amount: formData.get("amount"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { receiverUsername, amount } = parsed.data;

  if (receiverUsername.toLowerCase() === session.username.toLowerCase()) {
    return { error: "You cannot transfer money to yourself" };
  }

  let receiverActualUsername = receiverUsername;

  try {
    await prisma.$transaction(async (tx) => {
      const sender = await tx.user.findUnique({
        where: { id: session.userId },
      });
      const receiver = await tx.user.findFirst({
        where: { username: { equals: receiverUsername, mode: "insensitive" } },
      });

      if (!sender) throw new Error("Sender not found");
      if (!receiver) throw new Error("Receiver not found");
      if (sender.balance < amount) throw new Error("Insufficient balance");

      receiverActualUsername = receiver.username;

      await tx.user.update({
        where: { id: sender.id },
        data: { balance: { decrement: amount } },
      });
      await tx.user.update({
        where: { id: receiver.id },
        data: { balance: { increment: amount } },
      });
      await tx.transaction.create({
        data: { senderId: sender.id, receiverId: receiver.id, amount },
      });
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Transfer failed",
    };
  }

  revalidatePath("/dashboard");
  return {
    success: `Successfully transferred ${amount} to ${receiverActualUsername}`,
  };
}

export async function resetSystemAction(): Promise<ActionState> {
  const admin = await requireAdmin();

  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({ where: { isAdmin: false } });
  await prisma.user.update({
    where: { id: admin.id },
    data: { balance: 1_000_000 },
  });

  revalidatePath("/admin");
  return { success: "System reset successful. All data cleared." };
}
