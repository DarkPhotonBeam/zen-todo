import { ChangeEvent, FormEvent } from "react";
import { TodoLength } from "@/generated-types/enums";

export function handleInputChange(setter: (v: string) => void) {
  return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
  };
}

export function preventDefault(e: Event | FormEvent) {
  e.preventDefault();
}

export function debug(msg: unknown) {
  if (process.env.NODE_ENV === "production") return;
  console.log(msg);
}

export function todoLengthString(length: TodoLength) {
  switch (length) {
    case TodoLength.A_SHORT:
      return "Short";
    case TodoLength.B_MEDIUM:
      return "Medium";
    case TodoLength.C_UNKNOWN:
      return "Unknown";
    case TodoLength.D_LONG:
      return "Long";
    default:
      return "Undefined";
  }
}
