"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import React from "react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    // <SessionProvider>
    <NextUIProvider>{children}</NextUIProvider>
    // </SessionProvider>
  );
}
