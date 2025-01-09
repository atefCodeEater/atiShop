"use client";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from "@nextui-org/react";
import Image from "next/image";
import { useSignIn } from "@/app/action/signIn";
import { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { canvasToFile } from "@/app/services/canvasToFile";
export default function SignUpComponent() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [messageUi, setMessageUi] = useState<{
    message: string;
    fault: boolean;
  }>({ message: "", fault: false });
  const [image, setImage] = useState<any>("");
  const [scale, setScale] = useState<any>(0.6);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
  };
  console.log("IMAGE  : ", image);

  const handleScaleChange = (value: number | number[]) => {
    if (value) {
      setScale(value);
    }
    // Update scale
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== rePassword) {
      return setMessageUi({
        message: "پسورد و تکرار پسورد برابر نیست",
        fault: true,
      });
    }
    if (!username.length) {
      return setMessageUi({
        message: "یوزرنیم وارد نشده است",
        fault: true,
      });
    }

    const canvas = editorRef.current?.getImageScaledToCanvas();
    const imagefile = await canvasToFile(canvas, image.name, image.type);
    const formdata = new FormData();
    formdata.append("Image", imagefile as any);
    formdata.append("user", JSON.stringify({ username, password } as any));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/authentication/credencial`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const message = response.json();
    if (response.ok) {
      return setMessageUi({
        message: "با موفقیت انجام شد",
        fault: false,
      });
    }
  };

  return (
    <div className=" ">
      <Popover backdrop="opaque" placement="left-end">
        <PopoverTrigger>
          <div
            className="bg-[#4E0114] cursor-pointer
          border-1 border-[#FFECC5] transition-all delay-150
           hover:bg-[#FFECC5]  hover:text-[#4E0114] 
          rounded-md h-8 text-center p-1 text-[#FFECC5] w-24"
          >
            ثبت نام
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="bg-[#4E0114] 
          border-1 border-[#FFECC5] 
   
          rounded-md text-center p-1 text-[#FFECC5] w-52 h-[340px] relative"
        >
          <h1
            className="absolute text-center w-full
            top-1 py-2 font-B_Traffic_Bold "
          >
            فرم ثبت نام
          </h1>
          <form
            onSubmit={async (e) => await handleSubmit(e)}
            className=" w-full h-[300px]  absolute bottom-0"
          >
            <div className="grid grid-cols-15 h-full relative w-full font-B_Traffic ">
              <input
                value={username || ""}
                type="text"
                name="username"
                className="text-right font-B_Traffic_Bold top-3 absolute w-[190px] 
                left-2 rounded-sm h-8  text-[#4E0114]
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5]  "
                placeholder="نام کاربری "
                onChange={(e) => {
                  setUsername(e.target.value as string);
                }}
              />
              <input
                value={password || ""}
                name="password"
                type="text"
                className="text-right font-B_Traffic_Bold top-[49px] absolute
                 w-[190px] left-2 rounded-sm h-8 mb-1  text-[#4E0114]
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
                placeholder="رمز عبور"
                onChange={(e) => {
                  setPassword(e.target.value as string);
                }}
              />
              <input
                name="repeatPassword"
                value={rePassword || ""}
                type="text"
                className="text-right font-B_Traffic_Bold top-[86px] absolute
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] text-[#4E0114]
                
                border-1
                 border-[#FFECC5] "
                placeholder="تکرار رمز عبور"
                onChange={(e) => {
                  setRePassword(e.target.value as string);
                }}
              />

              <div
                className={`absolute text-base  w-[190px] ${
                  messageUi.fault ? "text-red-500" : "text-green-500"
                }  
              top-[120px] h-8 left-2`}
              >
                {messageUi.message}
                <div
                  style={{ scale: 0.22 }}
                  className="absolute -top-0 right-14  scale-y-50 w-[190px] h-28 "
                >
                  <Dropzone onDrop={handleDrop} noClick noKeyboard>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <AvatarEditor
                          ref={editorRef}
                          scale={scale}
                          width={700}
                          height={700}
                          image={image}
                          border={6}
                        />

                        <input {...getInputProps()} />
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>

              <Slider
                onChange={handleScaleChange}
                classNames={{
                  thumb: "bg-[#4E0114]",
                  track: " border-[#4E0114] border-0 rounded-sm ",
                  filler: " bg-[#FFECC5] ",
                }}
                className="absolute  h-[60px] bottom-14  right-0"
                aria-label="Temperature"
                defaultValue={1}
                value={scale}
                minValue={0.6}
                maxValue={2}
                // value={10}
                orientation="vertical"
                size="sm"
                step={0.01}
              />

              <Button
                className=" rounded-md absolute font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5] bottom-0 w-[190px] right-2"
                type="submit"
              >
                ورود
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
