import css from "./page.module.scss";
import AuthWrapper from "@/components/AuthWrapper";
import { getTodo } from "@/lib/query-todo";
import TodoViewer from "@/app/TodoViewer";
import LinkButton from "@/components/input/LinkButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const todoRes = await getTodo();

  if (!todoRes.success || !todoRes.data) {
    redirect("/auth/sign-in");
  }

  return (
    <AuthWrapper>
      <main className={css.page}>
        <TodoViewer
          initialTodo={todoRes.data.todo}
          initialTodoCounts={todoRes.data.todoCounts}
        />
      </main>
    </AuthWrapper>
  );
}
