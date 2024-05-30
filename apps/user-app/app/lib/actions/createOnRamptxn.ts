"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  if (!userId) {
    return {
      message: "usernot logged in",
    };
  }
  const token = (Math.random() * 1000).toString();

  await prisma.onRampTransactions.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });
  return {
    message: "On ramp transaction added",
  };
}
