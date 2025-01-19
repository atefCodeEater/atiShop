"use client";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useSignIn } from "@/app/action/signIn";
import { useState } from "react";
import Button_Spinner from "../ReusableComponents/ButtonSpinner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { paths } from "@/app/paths";
export default function SignInComponent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [messageUi, setMessageUi] = useState<{
    message: string;
    fault: boolean;
  }>({ message: "", fault: false });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    const formdata = new FormData();

    formdata.append("email", email);
    formdata.append("password", password);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/authentication/credencial`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const message = await response.json();
    if (response.ok) {
      setMessageUi(message);
      setTimeout(() => {
        router.refresh();
      }, 1000);
      console.log(message.message);
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
            ورود
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="bg-[#4E0114] 
          border-1 border-[#FFECC5] 
   
          rounded-md text-center p-1 text-[#FFECC5] w-52 h-[300px] relative"
        >
          <form
            action={async () => await useSignIn()}
            className=" cursor-pointer absolute top-0  flex items-center space-x-2
           w-full justify-center h-12"
          >
            <Button
              type="submit"
              className="w-full h-full relative bg-transparent"
            >
              <FcGoogle className=" text-4xl  absolute left-12" />
              <div className="font-B_Traffic_Bold absolute right-8 text-[#FFECC5]">
                ورود با گوگل
              </div>
            </Button>
          </form>
          <h1
            className="absolute text-center w-full
           border-[#FFECC5] top-14 py-2 border-t-1
            border-dashed font-B_Traffic_Bold"
          >
            ورود با ایمیل و رمز عبور
          </h1>
          <form
            action={handleSubmit}
            className=" w-full h-[65%]  absolute bottom-1"
          >
            <div className="grid grid-cols-15 h-full relative w-full font-B_Traffic ">
              <input
                value={email || ""}
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                className="text-right font-B_Traffic_Bold top-2 absolute w-[190px] 
                left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
                placeholder="ایمیل "
              />
              <input
                onChange={(event) => setPassword(event.target.value)}
                value={password || ""}
                name="password"
                className="text-right font-B_Traffic_Bold top-12 absolute
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
                placeholder="رمز عبور"
              />
              <div
                className={` rounded-md h-6 absolute font-B_Traffic_Bold
                ${
                  messageUi.fault ? "text-[#bb284d]" : "text-[#FFECC5]"
                }  bottom-[82px] w-[190px] right-2`}
              >
                {messageUi.message}
              </div>
              <Button_Spinner
                children="ورود"
                className="rounded-md absolute font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5] bottom-9 w-[190px] right-2"
              />

              <Link
                className="rounded-md flex justify-center items-center absolute text-sm font-B_Traffic_Bold
               bg-[#fbcd6f] hover:bg-[#f8bc46] hover:text-base transition-all delay-150 text-[#4E0114]
                  bottom-0 h-7 w-[190px] right-2"
                href={paths.findingPassword()}
              >
                بازیابی رمز عبور
              </Link>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
