"use server"
import CryptoJS from "crypto-js";
import { signIn } from "@/app/auth"
import { db } from "@/app/db"

import { string } from "zod";

export async function credencialAuth(formdata: FormData) {

    const email = formdata.get('email') as string
    const password = formdata.get('password') as string
    if (!email || !password) {
        throw new Error('مشخصات وارد نشده است')
    }
    var user = await db.user.findUnique({ where: { email: email as string } })
    if (!user) {
        throw new Error('این کاربر موجود نیست')
    }
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(user?.password as string, process.env.CRYPTOSECRET as string);
    var decodePassword = bytes.toString(CryptoJS.enc.Utf8);
    if (decodePassword !== password) {
        throw new Error('ثبت نام نکرده اید')
    }
    await signIn('credentials', {
        email, password: user.password, redirect: false
    })
    return ('با موفقیت انجام شد')


}