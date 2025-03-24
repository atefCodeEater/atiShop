"use server"

import path from "path"

import { arrayBuffer } from "stream/consumers";
import { db } from "@/app/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { paths } from "@/app/paths";

export async function POST(req: Request) {
    const formdata = req.formData()

    const userItem = JSON.parse((await formdata).get('user') as string)
    const { id, groupLevel, prevLastGroup_id } = userItem
    console.log("userItem : ", userItem);

    prevLastGroup_id && prevLastGroup_id.length > 3 && await db.groups.update({
        where: {
            id: prevLastGroup_id as string,

        }, data: {
            isLastItem: false
        }
    })

    const recieveGroup = await db.groups.updateMany({
        where: {
            id: id as string
        }, data: {
            isLastItem: true
        }
    })

    revalidatePath(paths.panelAdmin())
    return NextResponse.json({ message: 'با موفقیت انجام شد', fault: true })



}