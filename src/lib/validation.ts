import { z } from "zod";
import { TodoLength } from "@/generated-types/enums";
import { TodoAction } from "@/lib/todo-types";

const TodoSchema = z.object({
  title: z
    .string()
    .nonempty({ error: "Title is required." })
    .max(64, { error: "Title must not be longer than 64 characters." }),
  description: z.string().max(2048, {
    error: "Description must not be longer than 2048 characters.",
  }),
  length: z.enum(TodoLength, { error: "Invalid duration." }),
});

const TodoActionSchema = z.object({
  id: z.string().nonempty(),
  action: z.enum(TodoAction, { error: "Invalid action." }),
});

export function validateTodo(
  title: unknown,
  description: unknown,
  length: unknown,
) {
  const input = { title, description, length };
  return TodoSchema.safeParse(input);
}

export function validateTodoPutParams(input: { id: unknown; action: unknown }) {
  return TodoActionSchema.safeParse(input);
}
