import "dotenv/config";
import { createAuthClient } from "better-auth/react";
console.log(`AUTH_BASEURL = ${process.env.AUTH_BASEURL}`);
export const authClient = createAuthClient({
  baseURL: process.env.AUTH_BASEURL,
  trustedOrigins: [process.env.AUTH_BASEURL as string],
});
