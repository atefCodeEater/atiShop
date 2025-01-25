// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string
            name?: string | null
            email?: string | null
            image?: string | null
            isAdmin?: boolean | null
        } & DefaultSession["user"];
    }

    interface User {
        id?: string
        name?: string | null
        email?: string | null
        image?: string | null
        isAdmin?: boolean | null
    }
}
