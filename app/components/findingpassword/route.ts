"use server"

import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
    const formdata = req.formData()

    const email = (await formdata).get('email') as string




    const user = await db.user.findUnique({
        where: { email: email as string }
    })
    // const usersPaaword =bcrypt.decodeBase64()  user?.password
    if (!user) {
        return NextResponse.json({ message: 'ایمیل شما ثبت نشده است', fault: true })
    }



    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "atefpoordehghan@gmail.com",
            pass: "wszatdouvrceeplt",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'atefpoordehghan@gmail.com', // sender address
            to: user?.email,
            subject: "Hello ✔", // Subject line
            text: `پسورد شما ${user?.password}`, // plain text body
            html: `<b>پسورد شما ${user?.password}</b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);




    revalidatePath(paths.findingPassword())


    return NextResponse.json({ message: 'با موفقیت انجام شد', fault: false })



}