import css from "./page.module.scss";
import AuthWrapper from "@/components/AuthWrapper";
import { getTodo } from "@/lib/query-todo";
import SignOutBtn from "@/components/SignOutBtn";
import TodoViewer from "@/app/TodoViewer";
import LinkButton from "@/components/input/LinkButton";

export default async function Home() {
  const todo = await getTodo();

  return (
    <AuthWrapper>
      <main className={css.page}>
        <div className={css.todoWrapper}>
          <TodoViewer initialTodo={todo} />
        </div>
        <LinkButton label={"Add Todo"} href={"/add"} />
      </main>
      <SignOutBtn />
    </AuthWrapper>
  );
}
