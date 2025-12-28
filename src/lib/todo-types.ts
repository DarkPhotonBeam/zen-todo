export const TodoAction = {
  PUSHBACK: "pushback",
  MARK_COMPLETED: "mark-completed",
} as const;

export type TodoAction = (typeof TodoAction)[keyof typeof TodoAction];
