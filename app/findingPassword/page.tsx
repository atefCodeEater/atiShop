"use server";

import Link from "next/link";
import FindingPassword from "../components/finding_Password";
import { paths } from "../paths";

export default async function page() {
  return (
    <div
      className="w-full text-[#FFECC5] h-screen bg-[#4E0114]  
           "
    >
      <div className="flex items-center ml-6  h-12 ">
        <Link
          className="transition-all delay-150 w-28  space-x-3 hover:-translate-x-3 
          flex justify-center items-center text-[#FFECC5] font-B_Traffic
           border-b-1 border-t-1 hover:shadow-[#FFECC5] hover:shadow-sm
        rounded-md border-[#FFECC5]"
          href={paths.homepage()}
        >
          صفحه اصلی
        </Link>
      </div>
      <div className=" w-full h-2/3  flex justify-center items-center">
        <FindingPassword />
      </div>
    </div>
  );
}
