"use server";
import { paths } from "@/app/paths";
import Link from "next/link";
import { RxExit } from "react-icons/rx";
export default async function Dashboard({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log("id in dasboard : ", id);

  return (
    <div className=" w-full h-screen bg-[#4E0114]">
      <div className=" flex items-center  px-12 w-full h-20  border-opacity-35 border-[#FFECC5] border-b-1">
        <Link
          className="transition-all delay-150 w-28 space-x-3 hover:-translate-x-3 
          flex justify-center border-b-1 border-t-1 hover:shadow-[#FFECC5] hover:shadow-sm
        rounded-md border-[#FFECC5]"
          href={paths.homepage()}
        >
          <RxExit className="text-[#FFECC5] rotate-180  text-3xl" />
          <div className="text-[#FFECC5] ">خروج</div>
        </Link>
      </div>
    </div>
  );
}
