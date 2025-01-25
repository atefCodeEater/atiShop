"use client";

import { BiAddToQueue } from "react-icons/bi";
import Modal_addGroup from "@/app/components/ReusableComponents/Modal_Components";

export default function AddGroup({ id }: { id: string }) {
  return (
    <div
      className="w-[600px] h-auto max-h-72  
               rounded-md  bg-[#FFECC5] mt-[98px] space-x-5 -space-y-5 justify-center flex flex-wrap"
    >
      <div className="w-full flex justify-end py-2">
        <Modal_addGroup
          actionButtonTitle="افزودن"
          icon={<BiAddToQueue size={20} />}
          openButtonTitle="افزودن"
          title="نام و عکس گروه را وارد کنید"
        />
      </div>
      <div
        className=" rounded-md bg-[#FFECC5]  w-full   text-[#4E0114] flex 
      justify-end h-9 items-center "
      ></div>

      {/* //! for uiGroup */}
      <div className="bg-[#4E0114] w-[400px] h-[200px]  rounded-md shadow-md shadow-[#000000]">
        <h1 className="flex justify-center items-center text-[#FFECC5] text-3xl">
          {" "}
          ...
        </h1>
      </div>
    </div>
  );
}
