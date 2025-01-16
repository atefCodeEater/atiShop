"use client";

import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { paths } from "../paths";
import Image from "next/image";
import { AiOutlineProfile } from "react-icons/ai";
export default function Profile({
  id,
  image,
  name,
}: {
  id: string;
  image: string;
  name: string;
}) {
  return (
    <div className=" flex justify-center space-x-2 items-center">
      <Link
        className="transition-all delay-150 opacity-85 hover:opacity-100 hover:shadow-[#FFECC5] 
         shadow-sm
          w-auto px-2 flex justify-center items-center
         border-[#FFECC5] border-b-1 border-t-1 rounded-md  space-x-3 h-7"
        href={paths.dashboard(id)}
      >
        <div className="text-[#FFECC5]  text-base font-B_Traffic">{name}</div>
        <div className="text-[#FFECC5]  text-base font-B_Traffic">پروفایل</div>
        <AiOutlineProfile className=" text-[#FFECC5]  text-2xl" />
      </Link>
      <Avatar
        className="border-1 border-[#FFECC5] "
        size="lg"
        alt="image"
        src={image}
      />
    </div>
  );
}
