"use server"

import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import bcrypt from "bcryptjs";
export async function POST(req: Request) {
    const formdata = req.formData()
    const id = (await formdata).get('id') as string
    const password = (await formdata).get('password') as string
    const prevPassword = (await formdata).get('prevPassword') as string
    console.log("PREVPASSWORD : ", prevPassword);
    const passwordSchema = z.object({
        password: z.string().min(4, { message: 'پسورد حد اقل چهار کاراکتر باشد' })
            .regex(/[@#$]/, "پسورد دارای کاراکتر های خاص باشد")
    })


    const prevPasswordFind = await db.user.findUnique({
        where: {
            id: id

        }
    })
    if (!prevPassword) {
        return NextResponse.json({ message: ["پسورد قبلی شما موجود نیست"], fault: true })
    }

    const verify = await bcrypt.compareSync(prevPassword, prevPasswordFind?.password as string)
    console.log("VERIFY : ", verify);

    if (!verify) {
        return NextResponse.json({ message: ["پسورد قبلی شما اشتباه است"], fault: true })
    }

    const result = await passwordSchema.safeParse({
        password
    })
    if (!result.success) {
        console.log(result.error.flatten().fieldErrors.password);
        return NextResponse.json({ message: result.error.flatten().fieldErrors.password, fault: true })
    }
    try {

        const user = await db.user.update({
            where: {
                id: id
            }, data: {
                password: password
            }
        })
        console.log(user);
        await signIn('credentials', {
            email: user.email,
            password: user.password, redirect: false
        })
        revalidatePath(paths.dashboard(id))
        return NextResponse.json({ message: ["با موفقیت انجام شد"] })

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message })

    }



    // return NextResponse.json({ message: "با موفقیت انجام شد" })
}