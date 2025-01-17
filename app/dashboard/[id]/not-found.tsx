"use client";

import { paths } from "@/app/paths";
import Link from "next/link";

export default function notFound({ params }: { params: any }) {
  console.log(params);
  return (
    <div className="bg-[#4E0114] text-[#FFECC5] flex justify-center items-center w-full h-screen">
      <div className=" bg-[#FFECC5] w-1/3 h-1/3 rounded-md text-center ">
        <div className=" font-B_Traffic_Bold text-[#4E0114]  shadow-[#4E0114] mt-20 mb-12 shadow-sm">
          برای وارد شدن به این قسمت باید احراز هویت کنید
        </div>
        <Link
          href={paths.homepage()}
          className="font-B_Traffic_Bold text-[#4E0114] border-[#4E0114] border-b-2"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
