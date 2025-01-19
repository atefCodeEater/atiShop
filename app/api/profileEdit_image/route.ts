"use server"

import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sign } from "crypto";
import { redirect } from "next/navigation";
export async function POST(req: Request) {
    const formdata = req.formData()

    const image = (await formdata).get('image') as File
    const id = (await formdata).get('id') as string

    const name = (await formdata).get('name') as string

    console.log("name : ", name);
    const sessionImage = (await formdata).get('sessionImage') as string
    const imageBuffer = await image.arrayBuffer()
    const uploadDir = path.join(process.cwd(), '/public/uploads/imagesOfGroup')

    if (fs.existsSync(path.join(process.cwd(), `/public/${sessionImage}`))) {

        fs.unlinkSync(path.join(process.cwd(), `/public/${sessionImage}`))
    }



    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
            recursive: true
        })
    }

    const getNumber = sessionImage.includes('_') ? Number(sessionImage.split('_')[1][0]) + 1 : 1
    const nameOfImage = `${name}_${getNumber.toString()}.jpg`
    fs.writeFileSync(path.join(uploadDir, nameOfImage), Buffer.from(imageBuffer))
    const imageUrl = `/uploads/imagesOfGroup/${nameOfImage}`
    console.log("imageUrl : ", imageUrl);

    try {
        const user = await db.user.update({
            where: { id: id }, data: {
                image: imageUrl
            }
        })

        await signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false
        })
        revalidatePath(paths.dashboard(id))


        return NextResponse.json({ message: 'با موفقیت انجام شد' })

    } catch (error) {
        console.log(error);
    }

}