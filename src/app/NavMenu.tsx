"use client";

import css from "./NavMenu.module.scss";
import { House, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { debug } from "@/lib/client-helpers";
import { AnimatePresence, motion } from "motion/react";

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
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setLoggedIn(false);
          redirect("/auth/sign-in");
        },
      },
    });
    setLoggedIn(true);
  }

  if (!loggedIn) return null;

  const offStyle = { scale: 0 };
  const onStyle = { scale: 1 };

  return (
    <motion.nav
      layout
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={css.nav}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key={open ? "open" : "not-open"}
            layout
            initial={offStyle}
            animate={onStyle}
            exit={offStyle}
          >
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
          </motion.div>
        ) : (
          <motion.button
            key={open ? "open" : "not-open"}
            layout
            initial={offStyle}
            animate={onStyle}
            exit={offStyle}
            className={"iconBtn"}
          >
            <Menu className={css.toggle} onClick={() => setOpen(true)} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
