"use server"

import { signIn } from "@/app/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const formdata = await request.formData()
    const email = formdata.get('email')
    const password = formdata.get('email')


    await signIn('credentials', {
        email, password, redirect: false
    })
    return NextResponse.json({ message: 'با موفقیت انجام شد' })

}