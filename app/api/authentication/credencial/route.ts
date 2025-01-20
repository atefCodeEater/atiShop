"use server"
import CryptoJS from "crypto-js";
import { signIn } from "@/app/auth"
import { db } from "@/app/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { string } from "zod";

export async function POST(request: Request) {
    const formdata = await request.formData()
    const email = formdata.get('email') as string
    const password = formdata.get('password') as string
    if (!email || !password) {
        return NextResponse.json({ message: 'مشخصات وارد نشده است', fault: true })
    }
    var user = await db.user.findUnique({ where: { email: email as string } })
    if (!user) {
        return NextResponse.json({ message: 'این کاربر موجود نیست', fault: true })
    }
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(user?.password as string, process.env.CRYPTOSECRET as string);
    var decodePassword = bytes.toString(CryptoJS.enc.Utf8);
    if (decodePassword !== password) {
        return NextResponse.json({ message: 'ثبت نام نکرده اید', fault: true })
    }
    await signIn('credentials', {
        email, password: user.password, redirect: false
    })
    return NextResponse.json({ message: 'با موفقیت انجام شد' })


}