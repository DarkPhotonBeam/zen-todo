"use client";

import css from "./NavMenu.module.scss";
import { House, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { debug } from "@/lib/client-helpers";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    (async () => {
      debug("useEffect NavMenu");
      const session = await authClient.getSession();
      if (!session) {
        setLoggedIn(false);
        return;
      }
      setLoggedIn(true);
    })();
  }, []);

  async function signOut() {
    setOpen(false);
    setLoggedIn(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setLoggedIn(false);
          redirect("/auth/sign-in");
        },
        onFailure: () => {
          setLoggedIn(true);
        },
      },
    });
    setLoggedIn(true);
  }

  if (!loggedIn) return null;

  return (
    <nav className={css.nav}>
      {open ? (
        <>
          <ul>
            <li>
              <button className={"iconBtn"} onClick={signOut}>
                <LogOut />
              </button>
            </li>
            <li>
              <Link onClick={() => setOpen(false)} href={"/"}>
                <House />
              </Link>
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
