"use server"

import path from "path"
import fs from "fs";
import { arrayBuffer } from "stream/consumers";
import { db } from "@/app/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { paths } from "@/app/paths";

export async function POST(req: Request) {
    const formdata = req.formData()
    const groupname = (await formdata).get('groupName') as string
    const parent = (await formdata).get('parent') as string

    const Image = (await formdata).get('Image') as File
    const toStringify = JSON.parse((await formdata).get('indicator') as string)
    const indicator = Number(toStringify)



    const imageBuffer = await Image.arrayBuffer()


    const pathImage = path.join(process.cwd(), '/public/uploads/groupsImages')

    if (!fs.existsSync(pathImage)) {
        fs.mkdirSync(pathImage, { recursive: true })
    }
    fs.writeFileSync(path.join(pathImage, `${groupname}.jpg`), Buffer.from(imageBuffer))
    const imageUrl = `uploads/groupsImages/${groupname}.jpg`
    try {

        const group = await db.groups.create({
            data: {
                image: imageUrl,
                name: groupname,
                isLastItem: false,
                groupLevel: indicator,
                parent: parent
            }
        })

        // console.log("group in Api createGroup :", group);
    } catch (err) {

    }
    const allgroups = await db.groups.findMany()
    // console.log("allgroups : ", allgroups);
    revalidatePath(paths.panelAdmin())
    return NextResponse.json({ message: 'با موفقیت انجام شد', fault: true })



}
