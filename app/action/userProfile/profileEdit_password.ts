"use server"
import CryptoJS from "crypto-js";
import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";


export async function changePassword(formdata: FormData) {

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
        throw new Error(JSON.stringify(["پسورد قبلی شما موجود نیست"]))
    }

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(prevPasswordFind?.password as string, process.env.CRYPTOSECRET as string);
    var decodePassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decodePassword !== prevPassword) {
        throw new Error(JSON.stringify(["پسورد قبلی شما اشتباه است"]))
    }

    const result = await passwordSchema.safeParse({
        password
    })
    if (!result.success) {
        console.log(result.error.flatten().fieldErrors.password);

        throw new Error(JSON.stringify(result.error.flatten().fieldErrors.password))
    }
    //! HASHING

    var ciphertext = CryptoJS.AES
        .encrypt(password, process.env.CRYPTOSECRET as string).toString();


    const user = await db.user.update({
        where: {
            id: id
        }, data: {
            password: ciphertext
        }
    })
    console.log(user);
    await signIn('credentials', {
        email: user.email,
        password: user.password, redirect: false
    })

    return { message: "با موفقیت انجام شد" }





    // return NextResponse.json({ message: "با موفقیت انجام شد" })
}