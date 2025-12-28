"use client";

import { authClient } from "@/lib/auth-client";
import Button from "@/components/input/Button";

export default function SignInForm() {
  async function signIn() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/",
      disableRedirect: false,
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn().then();
      }}
    >
      <Button isSubmit={true} label={"Sign-In Using GitHub"} />
    </form>
  );
}
