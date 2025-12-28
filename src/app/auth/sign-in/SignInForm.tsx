"use client";

import { authClient } from "@/lib/auth-client";
import Button from "@/components/input/Button";

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
    <>
      <Button
        onClick={getSignInHandler("github")}
        label={"Sign-In Using GitHub"}
      />
      <Button
        onClick={getSignInHandler("google")}
        label={"Sign-In Using Google"}
      />
    </>
  );
}
