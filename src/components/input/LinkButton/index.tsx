"use client";

import css from "@/components/input/Input.module.scss";
import Link from "next/link";

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
    <Link className={css.linkBtn + " " + className} href={href} target={target}>
      {label}
    </Link>
  );
}
