import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import React from "react";
import NavMenu from "@/app/NavMenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zen Todo",
  description: "Minimal Todo App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {session ? <NavMenu /> : ""}
      </body>
    </html>
  );
}
