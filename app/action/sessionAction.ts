"use server"

import { Session } from "next-auth";
// import type { Session } from "@prisma/client"; 
import { auth } from "../auth";

export const forSession = async (): Promise<Session | null> => {
    const session = await auth();
    return session
}