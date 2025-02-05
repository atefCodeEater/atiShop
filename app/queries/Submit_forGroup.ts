import { canvasToFile } from "@/app/services/canvasToFile";
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
}

export const handleSubmit = async ({ groupName, setIndicator, setMessageUi, editorRef, image,
    groupLevel, router, parent
}: handleSubmit_Group) => {
    if (!groupName.length) {
        return setMessageUi({
            message: "نام گروه وارد نشده است",
            fault: true,
        });
    }
    const formdata = new FormData();

    const canvas = editorRef.current?.getImageScaledToCanvas();
    const imagefile = await canvasToFile(canvas, image.name, image.type);
    formdata.append("Image", imagefile as any);
    formdata.append("groupName", groupName as any);
    formdata.append("parent", parent as any);

    formdata.append("groupLevel", JSON.stringify(groupLevel));

    formdata.append("user", JSON.stringify({ groupName } as any));
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ROOTURL}/api/related_Groups/createGroup`,
        {
            method: "POST",
            body: formdata,
        }
    );
    const message = await response.json();
    console.log("message.allgroups : ", message.allgroups);
    if (response.ok) {
        setIndicator(groupLevel)
        setMessageUi({ message: message.message, fault: false });
        setTimeout(() => {
            router.refresh();
        }, 1000);
    }
};