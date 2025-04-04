import { canvasToFile } from "@/app/services/canvasToFile";
import { Groups } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";


interface handleSubmit_Group {

    groupName: string,
    setMessageUi: Dispatch<SetStateAction<{
        message: string;
        fault: boolean;
    }>>,
    editorRef: any,
    image: File,
    groupLevel: number,
    router: any
    parent: string
    setIndicator?: any
    groups: Groups
    id?: string
}

export const handleSubmit = async ({ groups, groupName, setIndicator, setMessageUi, editorRef, image,
    groupLevel, router, parent
}: handleSubmit_Group) => {

    const formdata = new FormData();

    const canvas = editorRef.current?.getImageScaledToCanvas();
    const imagefile = await canvasToFile(canvas, image.name, image.type);
    formdata.append("Image", imagefile as any);
    formdata.append("groupName", groupName as any);
    formdata.append("parent", parent as any);

    formdata.append("groupLevel", JSON.stringify(groupLevel));

    formdata.append("user", JSON.stringify({ groupName } as any));

};