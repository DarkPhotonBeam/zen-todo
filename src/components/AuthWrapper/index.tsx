import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface AuthWrapperProps {
  children: React.ReactNode;
}

export default async function Index({ children }: AuthWrapperProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return children;
}
