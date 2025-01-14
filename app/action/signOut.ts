"use server"
import { signIn, signOut } from "@/app/auth";
import { revalidatePath } from "next/cache";

export async function useSignOut() {
    await signOut({ redirect: false })
    return revalidatePath('/')
}