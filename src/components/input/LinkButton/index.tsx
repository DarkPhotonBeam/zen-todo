"use client";

import css from "@/components/input/Input.module.scss";
import { motion } from "motion/react";
import Link from "next/link";
import { hoverStyle, tapStyle } from "@/components/input";

export interface LinkButtonProps {
  label: string;
  className?: string;
  href: string;
  target?: string;
}

export default function LinkButton({
  label,
  href,
  className,
  target,
}: LinkButtonProps) {
  return (
    <motion.div layout whileHover={hoverStyle} whileTap={tapStyle}>
      <Link
        className={css.linkBtn + " " + className}
        href={href}
        target={target}
      >
        {label}
      </Link>
    </motion.div>
  );
}
