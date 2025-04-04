"use server"

import { db } from "@/app/db"

export const fetchGroupsQuery = async () => {
    const data = await db.groups.findMany()
    console.log("data server : ", data);
    return data
}