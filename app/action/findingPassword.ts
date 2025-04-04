"use server"
import CryptoJS from "crypto-js";

import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
export async function findingPassword(formdata: FormData) {


    const email = (await formdata).get('email') as string

    const user = await db.user.findUnique({
        where: { email: email as string }
    })
    // const usersPaaword =bcrypt.decodeBase64()  user?.password
    if (!user) {
        throw new Error('ایمیل شما ثبت نشده است')
    }

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(user.password as string, process.env.CRYPTOSECRET as string);
    var decodePassword = bytes.toString(CryptoJS.enc.Utf8);

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
            subject: "از طرف شرکت atiShop ", // Subject line
            text: `پسورد شما ${decodePassword}`, // plain text body
            html: `<b> 
   <b style={{
          border: "dashed",
          backgroundColor: "#4E0114",
          color: "#FFECC5",
          textAlign: "center",
          borderColor: "#FFECC5",
          padding: "2",
          width: "300px",
          height: "60px",
        }}
      >
      ${decodePassword} : پسورد شما 
      </b>

             
             </b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);




    revalidatePath(paths.findingPassword())


    return { message: 'با موفقیت انجام شد' }



}