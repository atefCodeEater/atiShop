"use server"

import { signIn } from "@/app/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const formdata = await request.formData()
    const email = formdata.get('email')
    const password = formdata.get('password')


    await signIn('credentials', {
        email, password, redirect: false
    })
    return NextResponse.json({ message: 'با موفقیت انجام شد' })


}