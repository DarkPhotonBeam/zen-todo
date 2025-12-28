"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import css from "./SignOutBtn.module.scss";

export default function SignOutBtn() {
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
    <span className={css.btn} onClick={signOut}>
      Sign Out
    </span>
  );
}
