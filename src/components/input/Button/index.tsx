"use client";

import css from "@/components/input/Input.module.scss";
import { MouseEventHandler } from "react";

export interface ButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
  isSubmit?: boolean;
  className?: string;
}

export default function Button({
  label,
  onClick,
  isSubmit,
  className,
}: ButtonProps) {
  return (
    <div className={css.wrapper + " " + className}>
      {isSubmit ? (
        <input type={"submit"} onClick={onClick} value={label} />
      ) : (
        <button onClick={onClick}>{label}</button>
      )}
    </div>
  );
}
