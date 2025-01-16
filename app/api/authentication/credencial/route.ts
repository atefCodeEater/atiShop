"use server"

import { signIn } from "@/app/auth"
import { db } from "@/app/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const formdata = await request.formData()
    const email = formdata.get('email') as string
    const password = formdata.get('password') as string

    var user = await db.user.findUnique({ where: { email: email as string } })
    if (!email.length || !password.length) {
        return NextResponse.json({ message: 'مشخصات وارد نشده است', fault: true })
    }
    if (!user) {
        return NextResponse.json({ message: 'ثبت نام نکرده اید', fault: true })
    }
    await signIn('credentials', {
        email, password, redirect: false
    })
    return NextResponse.json({ message: 'با موفقیت انجام شد' })


}