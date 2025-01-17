"use server"

import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function POST(req: Request) {
    const formdata = req.formData()

    const id = (await formdata).get('id') as string
    var username = (await formdata).get('username') as string
    const prevUsername = (await formdata).get('prevUsername') as string

    const usernameFind = await db.user.findUnique({
        where: {
            id: id,
            name: prevUsername
        }
    })
    if (!usernameFind) {
        return NextResponse.json({ message: "یوزرنیم قبلی شما موجود نیست", fault: true })
    }
    const usernameSchema = z.object({
        username: z.string().min(4, { message: 'یوزرنیم حد اقل چهار کاراکتر باشد' })
    })

    const result = await usernameSchema.safeParse({
        username: username
    })


    if (!result.success) {
        return NextResponse.json({ message: result.error.flatten().fieldErrors.username, fault: true })
    }
    try {

        const user = await db.user.update({
            where: {
                id: id
            }, data: {
                name: username
            }
        })
        console.log(user);
        await signIn('credentials', {
            email: user.email,
            password: user.password, redirect: false
        })
        revalidatePath(paths.dashboard(id))

        return NextResponse.json({ message: "با موفقیت انجام شد" })

    } catch (error) {
        return NextResponse.json({ message: error })

    }




    // return NextResponse.json({ message: "با موفقیت انجام شد" })
}