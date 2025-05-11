"use server"

import { db } from "@/app/db"

export const fetchGroupsQuery = async () => {
    const data = await db.groups.findMany()
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(data)
    //     }, 5000);
    // })
    return data

}