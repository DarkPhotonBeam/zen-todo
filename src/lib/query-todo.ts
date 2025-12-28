import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function getTodo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  try {
    const sortedTodos = await prisma.todo.findMany({
      where: { userId: session.user.id, completed: false },
      orderBy: [{ length: "asc" }, { createdAt: "asc" }],
    });

    if (sortedTodos.length === 0) return null;

    return sortedTodos[0];
  } catch {
    logger.error("Failed to query todos.");
    return null;
  }
}
