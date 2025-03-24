import { Groups } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { json } from "stream/consumers";
import { paths } from "../paths";


export async function deleteGroup({ e, groups, setIndicator, groupLevel, id, name, router }: {
    e: any, groups: Groups, parent: string, setIndicator: any,
    name: string, groupLevel: number, id: string, router: any
}) {
    const formdata = new FormData()

    formdata.append('groups', JSON.stringify(groups))
    formdata.append('id', id)

    formdata.append('name', name)

    formdata.append('groupLevel', JSON.stringify(groupLevel))

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOTURL}/api/related_Groups/deleteGroup`, {
        method: 'POST',
        body: formdata
    })

    const message = await response.json()
    if (response.ok) {
        router.refresh()
        { groupLevel === 1 ? setIndicator(1) : setIndicator(groupLevel - 1) }
    }

}