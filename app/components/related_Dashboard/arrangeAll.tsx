"use client";
import AddProduct from "@/app/components/related_Dashboard/add_product";
import ShowProducts from "@/app/components/related_Dashboard/show_products";
import EditProduct from "@/app/components/related_Dashboard/edit_product";
import EditProfile from "@/app/components/related_Dashboard/edit_profile";

import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function ArrangeAll({ id }: { id: string }) {
  const [item, setItem] = useState<number>(0);
  return (
    <div className="h-full w-full">
      <div className="space-x-9 flex justify-center  h-14">
        <button
          onClick={(e) => setItem(4)}
          className="rounded-md h-10 transition-all delay-150 text-sm hover:text-base
         hover:text-[#4E0114] hover:bg-[#FFECC5] font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5]  w-[190px] right-2"
        >
          دیدن کالاها
        </button>
        <button
          onClick={(e) => setItem(3)}
          className="rounded-md h-10 transition-all delay-150 text-sm hover:text-base
         hover:text-[#4E0114] hover:bg-[#FFECC5] font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5]  w-[190px] right-2"
        >
          ویرایش کالا
        </button>
        <button
          onClick={(e) => setItem(2)}
          className="rounded-md h-10 transition-all delay-150 text-sm hover:text-base
         hover:text-[#4E0114] hover:bg-[#FFECC5] font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5]  w-[190px] right-2"
        >
          افزودن کالا
        </button>
        <button
          onClick={(e) => setItem(1)}
          className={`rounded-md h-10 
            ${
              item === 1
                ? "bg-[#f9d691] shadow-sm shadow-[#fde1a9] text-[#4E0114] text-base"
                : " hover:text-[#4E0114] hover:bg-[#FFECC5] bg-[#4E0114] text-[#FFECC5] text-sm hover:text-base"
            } 
          transition-all delay-150 
          font-B_Traffic_Bold
                  border-1
                 border-[#FFECC5]  w-[190px] right-2`}
        >
          ویرایش پروفایل
        </button>
      </div>
      <div className="w-full h-2/3 flex justify-center-center bg-slate-400">
        {(item === 1 && <EditProfile id={id as string} />) ||
          (item === 2 && <AddProduct id={id as string} />) ||
          (item === 3 && <EditProduct id={id as string} />) ||
          (item === 4 && <ShowProducts id={id as string} />)}
      </div>
    </div>
  );
}
