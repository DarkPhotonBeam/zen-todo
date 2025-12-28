import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function cleanTodos(userId: string) {
  const lastValidDate = new Date();
  lastValidDate.setDate(lastValidDate.getDate() - 3);
  logger.debug(`Last valid date: ${lastValidDate.toISOString()}`);
  try {
    return await prisma.todo.deleteMany({
      where: {
        userId,
        updatedAt: {
          lt: lastValidDate,
        },
        completed: true, // only delete completed todos
      },
    });
  } catch {
    return null;
  }
}
