"use server"

import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';
import { db } from "@/app/db";
// import bcrypt from "bcryptjs";
import { z } from "zod";
import CryptoJS from "crypto-js";
export const submiting = async (formdata: FormData): Promise<any> => {

    const image = await formdata.get("Image") as File
    console.log("image : ", image);
    const username = await formdata.get("username") as any
    const password = await formdata.get("password") as any
    const email = await formdata.get("email") as any
    console.log('username : ', username);
    const schema = z.object({
        email: z.string().email({ message: "ایمیل صحیح نیست" }),
        password: z.string().min(4, { message: 'پسورد حد اقل چهار کاراکتر باشد' })
            .regex(/[@#$]/, "پسورد دارای کاراکتر های خاص باشد")
    });
    const findPrevUser = await db.user.findUnique({ where: { email } })
    if (findPrevUser) {
        throw new Error(JSON.stringify({ message: ['این ایمیل ثبت شده است'] }))
    }
    const result = schema.safeParse({
        email,
        password
    })
    if (result.success) {

        const buffer = await image?.arrayBuffer();
        const uploadDir = path.join(process.cwd(), '/public/uploads/imagesOfUsers');
        // Ensure this directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, `${username}.jpg`);
        fs.writeFileSync(filePath, Buffer.from(buffer) as Uint8Array);
        var imageUrl = `/uploads/imagesOfUsers/${username}.jpg`

        //! HASHING

        var ciphertext = CryptoJS.AES
            .encrypt(password, process.env.CRYPTOSECRET as string).toString();



        const User = await db.user.create({
            data: {
                name: username,
                email: email,
                password: ciphertext,
                image: image.name !== "undefined" ? imageUrl : '',
                isAdmin: false
            }
        })
        console.log("User in Api Submit", User);

    } else {
        const errorsEmail = result.error.flatten().fieldErrors.email?.flat() as string[]
        const errorsPassword = result.error.flatten().fieldErrors.password?.flat() as string[]
        const allErros = [...errorsPassword, ...errorsEmail]
        console.log("allErros : ", allErros);
        throw new Error(JSON.stringify({ message: allErros }))
    }

    return ''



}