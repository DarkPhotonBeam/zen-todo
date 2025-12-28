"use client";

import { InputProps } from "@/components/input";
import css from "@/components/input/Input.module.scss";

export default function TextAreaInput({
  name,
  value,
  onChange,
  label,
  required,
}: InputProps) {
  return (
    <div className={css.wrapper}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
      />
    </div>
  );
}
