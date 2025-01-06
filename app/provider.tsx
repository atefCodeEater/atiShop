import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export async function Provider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
