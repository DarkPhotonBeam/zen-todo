"use client";

import css from "./TodoViewer.module.scss";
import { TodoLength } from "@/generated-types/enums";
import { todoLengthString, debug } from "@/lib/client-helpers";
import { useState } from "react";
import Button from "@/components/input/Button";

export interface TodoViewerProps {
  initialTodo: {
    id: string;
    title: string;
    description?: string | null;
    length: TodoLength;
  } | null;
}

export default function TodoViewer({ initialTodo }: TodoViewerProps) {
  const [todo, setTodo] = useState(initialTodo);

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

  async function markCompleted() {
    if (!todo || !todo.id) return;
    const res = await fetch(`/api/todos?id=${todo.id}`, {
      method: "PUT",
    });
    const body = await res.json();
    if (!body.success) {
      debug(body.data);
      // TODO: add error message to client
      return;
    }
    debug(body.data.newTodo);
    setTodo(body.data.newTodo);
  }

  if (!todo) {
    return <div>Congrats, you have no more todos!</div>;
  }

  return (
    <>
      <div className={css.todo}>
        <div className={css.title}>{todo.title}</div>
        <div className={css.desc}>{todo.description}</div>
        <div className={css.length}>
          <span className={classOfTodoLength(todo.length)}>
            {todoLengthString(todo.length)}
          </span>
        </div>
      </div>
      <Button
        onClick={markCompleted}
        className={css.addBtn}
        label={"Mark as completed"}
      />
    </>
  );
}
