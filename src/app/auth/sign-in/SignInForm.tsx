"use client";

import { authClient } from "@/lib/auth-client";
import Button from "@/components/input/Button";
import GitHubIcon from "@/icons/GitHubIcon";
import GoogleIcon from "@/icons/Google";
import { motion } from "motion/react";
import css from "./SignInForm.module.scss";

export default function SignInForm() {
  function getSignInHandler(provider: string) {
    return async () =>
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/error",
        newUserCallbackURL: "/",
        disableRedirect: false,
      });
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={css.wrapper}
    >
      <Button onClick={getSignInHandler("github")}>
        <GitHubIcon />
        Sign-In Using GitHub
      </Button>
      <Button onClick={getSignInHandler("google")}>
        <GoogleIcon />
        Sign-In Using Google
      </Button>
    </motion.div>
  );
}
