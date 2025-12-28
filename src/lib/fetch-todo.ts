import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getTodo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  try {
    const todos = await prisma.todo.findMany({
      where: { userId: session.user.id, completed: false },
      orderBy: [{ length: "asc" }, { createdAt: "asc" }],
    });

    const sortedTodos = todos;

    console.log(sortedTodos);

    if (sortedTodos.length === 0) return null;

    return sortedTodos[0];
  } catch (e) {
    console.warn(e);
    return null;
  }
}
