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
export default function SignInComponent() {
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
   
          rounded-md text-center p-1 text-[#FFECC5] w-52 h-64 relative"
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
            ورود با نام کاربری و رمز عبور
          </h1>
          <form className=" w-full h-3/5  absolute bottom-2">
            <div className="grid grid-cols-15 h-full relative w-full font-B_Traffic ">
              <input
                className="text-right font-B_Traffic_Bold top-2 absolute w-[190px] 
                left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
                placeholder="نام کاربری "
              />
              <input
                className="text-right font-B_Traffic_Bold top-12 absolute
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
                placeholder="رمز عبور"
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
