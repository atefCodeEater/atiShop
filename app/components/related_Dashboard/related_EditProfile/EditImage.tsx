"use client";
import AvatarEditor from "react-avatar-editor";
import { useRef, useState } from "react";
import Button_Spinner from "../../ReusableComponents/ButtonSpinner";
import Dropzone from "react-dropzone";

export default function EditPassword({ id }: { id: string }) {
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>();

  const [prevPassword, setPrevPassword] = useState("");
  const imageRef = useRef();
  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
  };

  return (
    <div
      className=" w-60 h-64  border-1 bg-[#4E0114] rounded-lg border-opacity-50 border-dashed
     border-[#FFECC5] relative"
    >
      <h1 className="w-full absolute mb-2 mt-2 text-[#FFECC5] font-B_Traffic_Bold text-center">
        {" "}
        تغییر عکس
      </h1>
      <div
        style={{ scale: 0.19 }}
        className=" -top-[260px] absolute w-60 right-[71px]"
      >
        <Dropzone onDrop={handleDrop} noClick noKeyboard>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <AvatarEditor
                className="bg-slate-300"
                width={1000}
                height={750}
                ref={imageRef.current}
                image={image as File}
                border={1}
              />
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </div>
      <Button_Spinner
        children="ثبت"
        className="rounded-md text-lg absolute font-B_Traffic_Bold
                bg-[#4E0114] text-[#FFECC5] border-1
                border-[#FFECC5] bottom-[13px] left-6 w-[190px] "
      />
    </div>
  );
}
