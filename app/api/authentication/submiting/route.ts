import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';
import { db } from "@/app/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
export async function POST(request: Request) {

    const schema = z.object({
        email: z.string().email({ message: "ایمیل صحیح نیست" }),
        password: z.string().min(4, { message: 'پسورد حد اقل چهار کاراکتر باشد' })
            .regex(/[@#$]/, "پسورد باید دارای کاراکتر های خاص باشد")
    });


    try {
        const formdata = request.formData()
        const image = (await formdata).get("Image") as File
        console.log(image);
        const user = (await formdata).get("user") as any
        const { username, password, email } = JSON.parse(user)
        const result = schema.safeParse({
            email,
            password
        })
        if (result.success) {

            const buffer = await image?.arrayBuffer();
            const uploadDir = path.join(process.cwd(), '/public/uploads/imagesOfGroup');
            // Ensure this directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, `${username}.jpg`);
            fs.writeFileSync(filePath, Buffer.from(buffer) as Uint8Array);
            var imageUrl = `${process.env.NEXT_PUBLIC_ROOTURL}/public/uploads/imagesOfGroup/${username}.jpg`

            const salt = await bcrypt.genSalt(5)
            const hashPassword = await bcrypt.hashSync(password, salt)

            const User = await db.user.create({
                data: {
                    name: username,
                    email: email,
                    password: hashPassword,
                    image: image.name !== "undefined" ? imageUrl : ''
                }
            })
            console.log("User in Api Submit", User);

            return NextResponse.json({ message: ['با موفقیت انجام شد'], level: 2 })
        } else {
            return NextResponse.json({ messages: result.error.flatten().fieldErrors })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: ["مشکلی در مشخات شما است"], level: 3 })
    }



}