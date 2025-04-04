"use server"

import path from "path"
import fs from "fs";
import { arrayBuffer } from "stream/consumers";
import { db } from "@/app/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { paths } from "@/app/paths";

export async function createGroup(formdata: FormData) {

    const groupname = (await formdata).get('groupName') as string
    const parent = (await formdata).get('parent') as string

    const Image = (await formdata).get('Image') as File
    const toStringify = JSON.parse((await formdata).get('groupLevel') as string)
    const groupLevel = Number(toStringify)

    if (!Image || !groupname.length) {
        throw new Error('مشخصات وارد نشده است')
    }

    const imageBuffer = await Image.arrayBuffer()


    const pathImage = path.join(process.cwd(), '/public/uploads/groupsImages')

    if (!fs.existsSync(pathImage)) {
        fs.mkdirSync(pathImage, { recursive: true })
    }
    fs.writeFileSync(path.join(pathImage, `${groupname}.jpg`), Buffer.from(imageBuffer))
    const imageUrl = `uploads/groupsImages/${groupname}.jpg`

    await db.groups.updateMany({
        where: {
            groupLevel
        }, data: {
            isLastItem: false
        }
    })

    const group = await db.groups.create({
        data: {
            image: imageUrl,
            name: groupname,
            isLastItem: true,
            groupLevel: groupLevel,
            parent: parent
        }
    })

    // console.log("group in Api createGroup :", group);
    return group



}
