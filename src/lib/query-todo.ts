import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { TodoLength } from "@/generated-types/enums";

export async function getTodo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    const todo = await prisma.todo.findFirst({
      where: { userId: session.user.id, completed: false },
      orderBy: [
        { length: "asc" },
        { numPushbacks: "asc" },
        { createdAt: "asc" },
      ],
    });

    const lengthRes = await getLengthCounts();

    if (!lengthRes.success || !lengthRes.data) {
      return { success: false, error: lengthRes.error };
    }

    return {
      success: true,
      data: { todo: todo, todoCounts: lengthRes.data.todoCounts },
    };
  } catch {
    logger.error("Failed to query todos.");
    return { success: false, error: "Failed to query todos." };
  }
}

export async function getLengthCounts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  const userId = session.user.id;

  try {
    const baseWhere = { userId, completed: false };
    const shortCount = await prisma.todo.count({
      where: { ...baseWhere, length: TodoLength.A_SHORT },
    });
    const mediumCount = await prisma.todo.count({
      where: { ...baseWhere, length: TodoLength.B_MEDIUM },
    });
    const unknownCount = await prisma.todo.count({
      where: { ...baseWhere, length: TodoLength.C_UNKNOWN },
    });
    const longCount = await prisma.todo.count({
      where: { ...baseWhere, length: TodoLength.D_LONG },
    });
    return {
      success: true,
      data: {
        todoCounts: {
          shortCount,
          mediumCount,
          unknownCount,
          longCount,
          totalCount: shortCount + mediumCount + unknownCount + longCount,
        },
      },
    };
  } catch {
    logger.error("Failed to get counts.");
    return { success: false, error: "Failed to get counts." };
  }
}
