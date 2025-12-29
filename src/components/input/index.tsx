import css from "./Input.module.scss";

export const hoverStyle = { scale: 1.05 };
export const tapStyle = { scale: 1.025 };

export interface InputProps {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
  name: string;
  required?: boolean;
}

export interface CustomInputProps {
  children?: React.ReactNode;
  label: string;
  name: string;
}

export function CustomInput({ children, label, name }: CustomInputProps) {
  return (
    <div className={css.wrapper}>
      <label htmlFor={name}>{label}</label>
      {children}
    </div>
  );
}
