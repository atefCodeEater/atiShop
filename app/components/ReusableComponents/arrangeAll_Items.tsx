"use client";
import AddProduct from "@/app/components/related_Dashboard/add_product";
import ShowProducts from "@/app/components/related_Dashboard/show_products";
import EditProduct from "@/app/components/related_Dashboard/edit_product";
import EditProfile from "@/app/components/related_Dashboard/edit_profile";
import AddGroup from "@/app/components/related_PanelAdmin/addGroup";

import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Groups } from "@prisma/client";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";

export default function ArrangeAll({
  groups,
  id,
  name,
  sessionImage,
  isAdmin,
}: {
  groups?: Groups[];
  id: string;
  isAdmin: boolean;
  name: string;
  sessionImage: string;
}) {
  const [item, setItem] = useState<number>(2);

  return (
    <div className="h-full w-full">
      <div className="space-x-1 flex justify-center  h-14">
        {!isAdmin && (
          <button
            onClick={(e) => setItem(4)}
            className={`rounded-md h-10 
            ${
              item === 4
                ? "bg-[#FFECC5] translate-y-9  shadow-sm shadow-[#000000] text-[#4E0114] text-base"
                : "  bg-[#4E0114] text-[#FFECC5] text-sm hover:text-base"
            } 
          transition-all 
          font-B_Traffic_Bold
                  border-1
                 border-[#FFECC5]  w-[190px] right-2`}
          >
            دیدن کالاها
          </button>
        )}
        <button
          onClick={(e) => setItem(3)}
          className={`rounded-md h-10 
            ${
              item === 3
                ? "bg-[#FFECC5] translate-y-9  shadow-sm shadow-[#000000] text-[#4E0114] text-base"
                : "  bg-[#4E0114] text-[#FFECC5] text-sm hover:text-base"
            } 
          transition-all 
          font-B_Traffic_Bold
                  border-1
                 border-[#FFECC5]  w-[190px] right-2`}
        >
          ویرایش کالا
        </button>
        <div>
          <button
            onClick={(e) => setItem(2)}
            className={`rounded-md h-10 
            ${
              item === 2
                ? "bg-[#FFECC5] translate-y-9  text-[#4E0114] text-base"
                : "  bg-[#4E0114] text-[#FFECC5] text-sm hover:text-base"
            } 
          transition-all 
          font-B_Traffic_Bold
                  border-1
                 border-[#FFECC5]  w-[190px] right-2`}
          >
            {!isAdmin ? "افزودن کالا" : "افزودن گروه"}
          </button>
          {item === 2 && (
            <div className="bg-[#FFECC5] w-[190px] h-[153px] rounded-md"></div>
          )}
        </div>

        <div>
          <button
            onClick={(e) => setItem(1)}
            className={`rounded-md h-10 
            ${
              item === 1
                ? "bg-[#FFECC5]  translate-y-9  text-[#4E0114] text-base"
                : "  bg-[#4E0114] text-[#FFECC5]  border-1 border-[#FFECC5] text-sm hover:text-base"
            } 
          transition-all 
          font-B_Traffic_Bold
                   w-[193px] right-2`}
          >
            ویرایش پروفایل
          </button>
          {item === 1 && (
            <div className="bg-[#FFECC5] w-[193px] h-[153px] rounded-md"></div>
          )}
        </div>
      </div>
      {
        <div className="w-full h-2/3 flex justify-center ">
          {(item === 1 && (
            <EditProfile
              sessionImage={sessionImage}
              isAdmin={isAdmin}
              id={id as string}
              name={name as string}
            />
          )) ||
            (item === 2 && !isAdmin ? (
              <AddProduct id={id as string} />
            ) : (
              <AddGroup groups={groups as Groups[]} id={id as string} />
            )) ||
            (item === 3 && <EditProduct id={id as string} />) ||
            (!isAdmin && item === 4 && <ShowProducts id={id as string} />)}
        </div>
      }
    </div>
  );
}
