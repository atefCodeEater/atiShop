import { db } from "@/app/db"
import { paths } from "@/app/paths"
import { Groups } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    const formdata = await req.formData()
    const allgroups = JSON.parse(formdata.get('groups') as any) as Groups[]
    var userId = formdata.get('id') as string

    const name = formdata.get('name')
    const groupLevel = JSON.parse(formdata.get('groupLevel') as any) as number

    const filterGroups = allgroups.filter((group: any) => {
        return group.parent === name
    }) as Groups[]
    var alldelete = [...filterGroups]

    function deleteLoop(mapfilter: Groups[]) {

        if (!mapfilter.length) {
            return null
        }
        var end: any = []
        var i = 0

        while (i < mapfilter.length) {

            var element: any = mapfilter[i]

            var mapfilter2 = allgroups.filter((group) => {

                return element.name === group.parent
            })

            if (mapfilter2.length > 0) {


                end.push(...mapfilter2)
                alldelete.push(...mapfilter2)
            }
            i++
        }
        return deleteLoop(end)
    }
    deleteLoop(filterGroups)
    // console.log("alldelete : ", alldelete)

    var byid = alldelete.map((obj) => {
        return obj.id
    })

    await db.groups.deleteMany({
        where: {
            id: {
                in: [...byid, userId] as any
            }
        }
    })
    revalidatePath(paths.panelAdmin())

    return NextResponse.json({ message: 'با موفقت حذف شد' })
}