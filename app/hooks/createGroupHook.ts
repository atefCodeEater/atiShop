

// import { createGroup } from "@/app/action/relatedGroups/createGroup";
// import { Groups } from "@prisma/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export async function createGroupHook({ e, editorRef, canvasToFile, image, groupLevel }:
//     { e: any, editorRef: any, canvasToFile: any, image: any, groupLevel: any }
// ) {
//     const queryclient = useQueryClient()
//     const addGroupQuery = useMutation({
//         mutationFn: createGroup, onSuccess: (data: any) => {
//             queryclient.setQueryData(
//                 ["groups"],
//                 (oldData: Groups[]) => {
//                     const result = oldData.map((res) => {
//                         if (res.groupLevel === groupLevel) {
//                             return { ...res, isLastItem: false };
//                         }
//                         return res;
//                     });

//                     return [...result, data];
//                 }
//             );
//         },
//     });
//     e.preventDefault();
//     const formdata = new FormData(e.currentTarget);
//     const canvas =
//         editorRef.current?.getImageScaledToCanvas();
//     const imagefile = await canvasToFile(
//         canvas,
//         image.name,
//         image.type
//     );
//     formdata.append("Image", imagefile as any);addGroupQuery

//     formdata.append("parent", parent as any);

//     formdata.append("groupLevel", JSON.stringify(groupLevel));

//     addGroupQuery.mutate(formdata);

//     return addGroupQuery
// }