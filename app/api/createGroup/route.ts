"use server"

import path from "path"
import fs from "fs";
import { arrayBuffer } from "stream/consumers";
import { db } from "@/app/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const formdata = req.formData()
    const groupname = (await formdata).get('groupName') as string
    const Image = (await formdata).get('Image') as File



    const imageBuffer = await Image.arrayBuffer()


    const pathImage = path.join(process.cwd(), '/public/uploads/groupsImages')

    if (!fs.existsSync(pathImage)) {
        fs.mkdirSync(pathImage, { recursive: true })
    }
    fs.writeFileSync(path.join(pathImage, groupname), Buffer.from(imageBuffer))
    const imageUrl = `uploads/groupsImages/${groupname}.jpg`

    const group = await db.groups.create({
        data: {
            image: imageUrl,
            name: groupname,
            isLastItem: false,
        }
    })
    console.log("group in Api createGroup :", group);
    return NextResponse.json({ message: 'با موفقیت انجام شد', fault: true })












}