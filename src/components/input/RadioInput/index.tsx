"use client";

import { InputProps } from "@/components/input";
import css from "@/components/input/Input.module.scss";

export interface RadioInputProps extends InputProps {
  checked: boolean;
}

export default function RadioInput({
  label,
  onChange,
  value,
  name,
  checked,
}: RadioInputProps) {
  return (
    <div className={css.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type={"radio"}
        id={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
}
