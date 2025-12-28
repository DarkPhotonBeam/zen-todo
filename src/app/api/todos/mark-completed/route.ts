import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    redirect("/");
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const userId = session.user.id;

  try {
    await prisma.todo.update({
      data: { completed: true },
      where: { id, userId },
    });
  } catch {
    redirect("/");
  }

  revalidatePath("/");
  redirect("/");
}
