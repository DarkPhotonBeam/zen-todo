"use client";

import css from "@/components/input/Input.module.scss";
import { MouseEventHandler } from "react";
import { motion } from "motion/react";
import { hoverStyle, tapStyle } from "@/components/input";

export interface ButtonProps {
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
  isSubmit?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({
  label,
  onClick,
  isSubmit,
  className,
  children,
}: ButtonProps) {
  return (
    <motion.div
      whileHover={hoverStyle}
      whileTap={tapStyle}
      className={css.wrapper + " " + className}
    >
      {isSubmit ? (
        <input type={"submit"} onClick={onClick} value={label} />
      ) : (
        <button onClick={onClick}>
          <div className={css.buttonInnerWrapper}>{label ?? children}</div>
        </button>
      )}
    </motion.div>
  );
}
