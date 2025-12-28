import { validateTodo } from "@/lib/validation";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getTodo } from "@/lib/query-todo";
import { cleanTodos } from "@/lib/clean-todos";
import { logger } from "@/lib/logger";

const MAX_TODOS = 100;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const valResult = validateTodo(body.title, body.description, body.length);

    if (!valResult.success) {
      return NextResponse.json({
        success: false,
        error: valResult.error.issues[0].message,
      });
    }

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const numTodos = await prisma.todo.count({
      where: { userId: userId, completed: false },
    });

    if (numTodos >= MAX_TODOS) {
      return NextResponse.json({
        success: false,
        error: `You cannot have more than ${MAX_TODOS} todos. Consider first completing some before adding more ;)`,
      });
    }

    const res = await prisma.todo.create({
      data: { ...valResult.data, user: { connect: { id: userId } } },
    });

    // We do not await this action since we don't need to wait for the result
    cleanTodos().then((r) => {
      if (!r || r.count === 0) return;
      logger.info(`Cleaned up ${r.count} todos.`);
    });

    return NextResponse.json({ success: true, data: res });
  } catch {
    logger.error(`Failed to add todo.`);
    return NextResponse.json({ success: false, error: `Could not add todo.` });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, error: "Id not specified." });
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  const userId = session.user.id;

  try {
    const oldTodo = await prisma.todo.update({
      data: { completed: true },
      where: { id, userId },
    });
    const newTodo = await getTodo();
    return NextResponse.json({
      success: true,
      data: {
        oldTodo,
        newTodo,
      },
    });
  } catch {
    logger.error(`Updating todo for user ${userId} failed.`);
    return NextResponse.json({
      success: false,
      error: "Updating todo failed.",
    });
  }
}
