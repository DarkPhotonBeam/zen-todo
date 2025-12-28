"use client";

import css from "./TodoViewer.module.scss";
import { TodoLength } from "@/generated-types/enums";
import { todoLengthString, debug } from "@/lib/client-helpers";
import { useState } from "react";
import { ClockPlus, SquareCheckBig } from "lucide-react";
import { TodoAction } from "@/lib/todo-types";

export interface TodoViewerProps {
  initialTodo: {
    id: string;
    title: string;
    description?: string | null;
    length: TodoLength;
  } | null;
  initialTodoCounts: {
    shortCount: number;
    mediumCount: number;
    longCount: number;
    unknownCount: number;
    totalCount: number;
  };
}

export default function TodoViewer({
  initialTodo,
  initialTodoCounts,
}: TodoViewerProps) {
  const [todo, setTodo] = useState(initialTodo);
  const [todoCounts, setTodoCounts] = useState(initialTodoCounts);

  function getLengthCount(length: TodoLength) {
    switch (length) {
      case TodoLength.A_SHORT:
        return todoCounts.shortCount;
      case TodoLength.B_MEDIUM:
        return todoCounts.mediumCount;
      case TodoLength.C_UNKNOWN:
        return todoCounts.unknownCount;
      case TodoLength.D_LONG:
        return todoCounts.longCount;
      default:
        return todoCounts.totalCount;
    }
  }

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

  function getActionHandler(action: TodoAction) {
    return async () => {
      return await performAction(action);
    };
  }

  async function performAction(action: TodoAction) {
    if (!todo || !todo.id) return;
    const res = await fetch(`/api/todos?id=${todo.id}&action=${action}`, {
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
    setTodoCounts(body.data.todoCounts);
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
          <div className={css.todoActions}>
            {getLengthCount(todo.length) <= 1 ? (
              ""
            ) : (
              <button onClick={getActionHandler("pushback")}>
                <ClockPlus />
              </button>
            )}
            <button onClick={getActionHandler("mark-completed")}>
              <SquareCheckBig />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
