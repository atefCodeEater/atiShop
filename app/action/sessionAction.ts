"use server"

import { Session } from "next-auth";
// import type { Session } from "@prisma/client"; 
import { auth } from "../auth";

export const forSession = async (): Promise<Session | null> => {
    const session = await auth();
    console.log("session ", session?.user);
    return session as Session
}