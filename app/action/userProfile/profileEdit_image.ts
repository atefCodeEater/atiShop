"use server"

import { signIn } from "@/app/auth";
import { db } from "@/app/db"
import { paths } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function profileEditImage(formdata: FormData) {


    const image = (await formdata).get('image') as File
    console.log("image : ", image);
    const id = (await formdata).get('id') as string
    const isAdminStringiFy = (await formdata).get('isAdmin') as string
    const isAdmin = JSON.parse(isAdminStringiFy) as boolean
    const name = (await formdata).get('name') as string
    if (image.name === "undefined") {
        throw new Error('عکس انتخواب نشده است')
    }
    console.log("name : ", name);
    const sessionImage = (await formdata).get('sessionImage') as string
    const imageBuffer = await image.arrayBuffer()
    const uploadDir = path.join(process.cwd(), '/public/uploads/imagesOfUsers')

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
    const imageUrl = `/uploads/imagesOfUsers/${nameOfImage}`
    console.log("imageUrl : ", imageUrl);

    try {
        const user = await db.user.update({
            where: { id: id }, data: {
                image: imageUrl,
                isAdmin: isAdmin
            }
        })

        await signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false
        })


        return { message: 'با موفقیت انجام شد' }

    } catch (error) {
        console.log(error);
    }

}