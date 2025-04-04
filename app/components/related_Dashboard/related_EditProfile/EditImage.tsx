"use client";
import AvatarEditor from "react-avatar-editor";
import { useEffect, useRef, useState } from "react";
import Button_Spinner from "../../ReusableComponents/ButtonSpinner";
import Dropzone from "react-dropzone";
import { canvasToFile } from "@/app/services/canvasToFile";
import { profileEditImage } from "@/app/action/userProfile/profileEdit_image";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function EditImage({
  id,
  name,
  sessionImage,
  isAdmin,
}: {
  isAdmin: boolean;
  id: string;
  name: string;
  sessionImage: string;
}) {
  const [scale, setScale] = useState<string>("2");

  const [image, setImage] = useState<File | null>();

  const changeImageQuery = useMutation({ mutationFn: profileEditImage });

  const imageRef = useRef<any>();
  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
  };
  const queryClient = useQueryClient();
  async function HandleSubmit(e: any) {
    e.preventDefault();
    const formdata = new FormData();

    const canvas = imageRef.current?.getImageScaledToCanvas();
    const imageFile = await canvasToFile(canvas, image?.name as string, "jpg");

    formdata.append("image", imageFile as File);
    formdata.append("name", name as string);
    formdata.append("isAdmin", JSON.stringify(isAdmin));

    formdata.append("id", id as string);

    formdata.append("sessionImage", sessionImage as string);

    changeImageQuery.mutate(formdata, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["forSession"] });
      },
    });
  }
  return (
    <div
      className=" w-60 h-64  border-1 bg-[#4E0114] rounded-lg border-opacity-50 border-dashed
     border-[#FFECC5] relative"
    >
      <h1 className="w-full absolute mb-2 mt-2 text-[#FFECC5] font-B_Traffic_Bold text-center">
        {" "}
        تغییر عکس
      </h1>
      <div className="w-full absolute text-xs top-10 text-[#FFECC5] font-B_Traffic_Bold text-center">
        عکس را در کادر زیر قرار دهید
      </div>
      <div
        style={{ scale: 0.15 }}
        className=" -top-[260px] scale-x-125 absolute w-60 right-[71px]"
      >
        <Dropzone onDrop={handleDrop} noClick noKeyboard>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <AvatarEditor
                className="border-2 border-dashed border-[#FFECC5]"
                width={1000}
                height={750}
                ref={imageRef}
                image={image as File}
                border={1}
                scale={Number(scale)}
              />
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </div>
      <div className="absolute   -rotate-90  h-3 w-24 left-[170px] bottom-32">
        <input
          style={{ accentColor: "#7e0e2a" }}
          type="range"
          className=" h-3 w-24  "
          value={scale}
          step={0.01}
          min={1}
          max={10}
          onChange={(e) => setScale(e.target.value)}
        />
      </div>
      <div
        className={` w-full absolute text-xs top-44 h-6 
      ${
        changeImageQuery.error ? "text-red-600" : "text-[#FFECC5]"
      }  font-B_Traffic_Bold text-center`}
      >
        {changeImageQuery.error?.message || changeImageQuery.data?.message}
      </div>
      <form onSubmit={async (e) => await HandleSubmit(e)}>
        <Button_Spinner
          children="ثبت"
          className="rounded-md text-lg absolute font-B_Traffic_Bold
                bg-[#4E0114] text-[#FFECC5] border-1
                border-[#FFECC5] bottom-[13px] left-6 w-[190px] "
        />
      </form>
    </div>
  );
}
