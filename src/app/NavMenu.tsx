"use client";

import css from "./NavMenu.module.scss";
import { House, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/auth/sign-in");
        },
      },
    });
  }

  return (
    <nav className={css.nav}>
      {open ? (
        <>
          <ul>
            <li>
              <Link href={"/"}>
                <House />
              </Link>
            </li>
            <li>
              <a onClick={signOut}>
                <LogOut />
              </a>
            </li>
            {/*<li>*/}
            {/*  <Link href={"/settings"}>*/}
            {/*    <Settings />*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
          <X className={css.toggle} onClick={() => setOpen(false)} />
        </>
      ) : (
        <Menu className={css.toggle} onClick={() => setOpen(true)} />
      )}
    </nav>
  );
}
