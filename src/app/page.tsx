import css from "./page.module.scss";
import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import Button from "@/components/input/Button";
import { getTodo } from "@/lib/fetch-todo";
import { TodoLength } from "@/generated-types/enums";
import { todoLengthString } from "@/lib/client-helpers";

export default async function Home() {
  const todo = await getTodo();

  return (
    <AuthWrapper>
      <main className={css.page}>
        <div className={css.todoWrapper}>
          {todo === null ? (
            <div>Congrats, you have no more todos!</div>
          ) : (
            <>
              <Todo todo={todo} />
              <Link
                className={css.addLink}
                href={`/api/todos/mark-completed?id=${todo?.id}`}
              >
                <Button className={css.addBtn} label={"Mark as completed"} />
              </Link>
            </>
          )}
        </div>
        <Link className={css.addLink} href={"/add"}>
          <Button className={css.addBtn} label={"Add Todo"} />
        </Link>
      </main>
    </AuthWrapper>
  );
}

interface TodoProps {
  todo: {
    title: string;
    description?: string | null;
    length: TodoLength;
  };
}

function Todo({ todo }: TodoProps) {
  function classOfTodoLength(length: TodoLength) {
    switch (length) {
      case TodoLength.A_SHORT:
        return css.short;
      case TodoLength.B_MEDIUM:
        return css.medium;
      case TodoLength.C_UNKNOWN:
        return css.unknown;
      case TodoLength.D_LONG:
        return css.long;
      default:
        return css.unknown;
    }
  }

  return (
    <div className={css.todo}>
      <div className={css.title}>{todo.title}</div>
      <div className={css.desc}>{todo.description}</div>
      <div className={css.length}>
        <span className={classOfTodoLength(todo.length)}>
          {todoLengthString(todo.length)}
        </span>
      </div>
    </div>
  );
}
