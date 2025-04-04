"use server"

import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { JsonObject } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function changeUsername(formdata: FormData) {


    const id = (await formdata).get('id') as string
    const isAdminStringiFy = (await formdata).get('isAdmin') as string
    const isAdmin = JSON.parse(isAdminStringiFy) as boolean
    console.log("typeof isAdmin : ", isAdmin);
    var username = (await formdata).get('username') as string
    const prevUsername = (await formdata).get('prevUsername') as string

    const usernameFind = await db.user.findUnique({
        where: {
            id: id,
            name: prevUsername
        }
    })
    if (!usernameFind) {
        throw new Error(JSON.stringify(["یوزرنیم قبلی شما موجود نیست"]))
    }
    const usernameSchema = z.object({
        username: z.string().min(4, { message: 'یوزرنیم حد اقل چهار کاراکتر باشد' })
    })

    const result = await usernameSchema.safeParse({
        username: username
    })


    if (!result.success) {
        throw new Error(JSON.stringify(result.error.flatten().fieldErrors.username))
    }


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

    return { message: "با موفقیت انجام شد" }






    // return NextResponse.json({ message: "با موفقیت انجام شد" })
}