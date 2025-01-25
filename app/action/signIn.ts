"use server"
import { signIn } from "@/app/auth";
import { revalidatePath } from "next/cache";

export async function useSignIn() {
    await signIn('google')
    return revalidatePath('/')
}