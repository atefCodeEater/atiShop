"use server";
import { useSignOut } from "@/app/action/signOut";
import { auth, signOut } from "@/app/auth";
import SignOutComponent from "@/app/components/related_Auth/signOut_Comp";
import ArrangeAll from "@/app/components/related_Dashboard/arrangeAll";
import { paths } from "@/app/paths";
import { Avatar } from "@nextui-org/react";

import Link from "next/link";
import { notFound } from "next/navigation";
import { RxExit } from "react-icons/rx";
export default async function Dashboard({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user) {
    return notFound();
  }
  console.log("session?.user : ", session?.user);

  return (
    <div className=" w-full h-screen fixed bg-[#4E0114]">
      <div
        className=" grid grid-cols-3  px-12 w-full h-20 
       border-opacity-35 border-[#FFECC5] border-b-1"
      >
        <div className="flex  items-center">
          <Link
            className="transition-all delay-150 w-28 space-x-3 hover:-translate-x-3 
          flex justify-center items-center text-[#FFECC5] font-B_Traffic border-b-1 border-t-1 hover:shadow-[#FFECC5] hover:shadow-sm
        rounded-md border-[#FFECC5]"
            href={paths.homepage()}
          >
            صفحه اصلی
          </Link>
        </div>
        <div className="flex justify-center space-x-4 items-center text-2xl text-[#FFECC5] font-B_Traffic">
          <div>{session.user.name}</div>
          <Avatar size="lg" src={session.user.image || ""} />
        </div>
        <div className="flex justify-end items-center">
          <SignOutComponent
            item={<RxExit className="text-2xl text-[#FFECC5] ml-4" />}
            redirect
            className="transition-all delay-150 w-28 cursor-pointer space-x-3 hover:translate-x-3 
          flex justify-center items-center text-[#FFECC5] font-B_Traffic border-b-1 border-t-1 hover:shadow-[#FFECC5] hover:shadow-sm
        rounded-md border-[#FFECC5]"
          />
        </div>
      </div>
      <div className="flex justify-center mt-20 w-full h-full">
        <ArrangeAll id={id} />
      </div>
    </div>
  );
}
