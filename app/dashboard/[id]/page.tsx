"use client";
import { useSignOut } from "@/app/action/signOut";
import { auth, signOut } from "@/app/auth";
import SignOutComponent from "@/app/components/related_Auth/signOut_Comp";
import ArrangeAll_Dashboard from "@/app/components/ReusableComponents/arrangeAll_Items";
import NameAndAvatar from "@/app/components/related_Dashboard/nameAvatar";
import { paths } from "@/app/paths";
import { Avatar } from "@nextui-org/react";
import { useCustomQuery } from "@/app/hooks/useQuery_customHook";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RxExit } from "react-icons/rx";
import { forSession } from "@/app/action/sessionAction";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
export default function Dashboard({
  params: { id },
}: {
  params: { id: string };
}) {
  const queryclient = useQueryClient();
  const { data } = useCustomQuery(["forSession", id], forSession, {
    queryKey: ["forSession", id],

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialData: () => {
      const cacheData = queryclient.getQueryData(["forSession"]) as Session;

      console.log("cacheData : ", cacheData);

      if (cacheData) {
        return cacheData;
      }
      return undefined;
    },
  });

  console.log("session?.user : ", data?.user);

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
        <div
          className="flex justify-center
         space-x-4 items-center text-2xl text-[#FFECC5] font-B_Traffic"
        >
          <NameAndAvatar
            image={(data as Session)?.user?.image as string}
            title={(data as Session)?.user?.name as string}
          />
        </div>
        <div className="flex justify-end items-center">
          <SignOutComponent
            item={<RxExit className="text-2xl text-[#FFECC5] ml-4" />}
            redirect
            className="transition-all bg-[#4E0114] delay-150 w-28 cursor-pointer space-x-3 hover:translate-x-3 
          flex justify-center items-center text-[#FFECC5] font-B_Traffic 
          border-b-1 border-t-1 hover:shadow-[#FFECC5] hover:shadow-sm
        rounded-md border-[#FFECC5]"
          />
        </div>
      </div>
      <div className="flex justify-center mt-20 w-full h-full">
        <ArrangeAll_Dashboard
          isAdmin={(data as Session)?.user?.isAdmin as boolean}
          sessionImage={(data as Session)?.user?.image as string}
          name={(data as Session)?.user?.name as string}
          id={id}
        />
      </div>
    </div>
  );
}
