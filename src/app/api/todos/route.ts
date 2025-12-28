import { validateTodo } from "@/lib/validation";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

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

    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.warn(error);
    return NextResponse.json({ success: false, error: `Could not add todo.` });
  }
}
