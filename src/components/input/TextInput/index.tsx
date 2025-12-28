"use client";

import { InputProps } from "@/components/input";
import css from "@/components/input/Input.module.scss";

export default function TextInput({
  label,
  onChange,
  value,
  name,
  required,
}: InputProps) {
  return (
    <div className={css.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type={"text"}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
      />
    </div>
  );
}
