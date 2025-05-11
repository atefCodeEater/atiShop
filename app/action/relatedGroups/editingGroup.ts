"use server"

import path from "path";
import fs from "fs";
import { db } from "@/app/db";
import { string } from "zod";


export async function editingGroup(formdata: FormData) {
    const canvasScaledFile = formdata.get('canvasScaledFile') as any
    const id = formdata.get('id') as string



    const prevGroupName = formdata.get('prevGroupName') as string
    const pathWrite = path.join(process.cwd() + `/public/uploads/groupsImages`)
    const prevImage = path.join(process.cwd() + `/public/uploads/groupsImages/${prevGroupName}.png`)

    if (fs.existsSync(prevImage)) {
        fs.unlinkSync(prevImage)
    }

    const groupName = formdata.get('groupName') as string
    if (!groupName.length) {
        throw new Error('نام گروه وارد نشده است')
    }
    const arrayBuffer = await canvasScaledFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer);
    if (!fs.existsSync(pathWrite)) {
        fs.mkdirSync(pathWrite, { recursive: true })
    }
    fs.writeFileSync(path.join(pathWrite, `${groupName}.png`), buffer)
    const userUpdated = await db.groups.update({
        where: { id: id }, data: {
            image: `/uploads/groupsImages/${groupName}.png`,
            name: groupName
        }
    })
    await db.groups.updateMany({
        where: { parent: prevGroupName }, data: {

            parent: groupName
        }
    })


}