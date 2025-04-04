"use server"
import { signIn, signOut } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { paths } from "../paths";

export async function useSignOut() {
    await signOut({ redirect: false })
    // revalidatePath('/')
    // return redirect(paths.homepage())
}