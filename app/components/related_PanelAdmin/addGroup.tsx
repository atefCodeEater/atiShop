"use client";

import { BiAddToQueue } from "react-icons/bi";
import Modal_addGroup from "@/app/components/ReusableComponents/Modal_Components";
import { Groups } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  dropdown,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { RxDropdownMenu } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function AddGroup({
  id,

  groups,
}: {
  id: string;
  groups: Groups[];
}) {
  const [messageUi, setMessageUi] = useState<{
    message: string;
    fault: boolean;
  }>({
    message: "",
    fault: false,
  });
  const router = useRouter();
  const [uiGroup, setuiGroup] = useState<Groups[][]>([]);

  const [indicator, setIndicator] = useState<number>(1);
  const [userItems, setUserItems] = useState<{
    id: string;
    groupLevel: number;
    prevLastGroup_id: string;
  }>({ id: "", groupLevel: 1, prevLastGroup_id: "" });

  const makeLastItem = async (event: any) => {
    const formdata = new FormData();

    formdata.append("user", JSON.stringify(userItems as any));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/related_Groups/makeLastItem`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const message = await response.json();
    if (response.ok) {
      router.refresh();
      return setMessageUi({ message: message.message, fault: false });
    }
  };

  useEffect(() => {
    var i = 1;
    var useinUiGroup: any = [];
    while (i <= indicator) {
      var withGroupLevel = groups.filter((group) => {
        if (i === 1) {
          return group.groupLevel === i && !group.isLastItem;
        } else {
          return (
            uiGroup.length &&
            group.groupLevel === i &&
            !group.isLastItem &&
            uiGroup[uiGroup?.length - 1][
              uiGroup[uiGroup?.length - 1]?.length - 1
            ]?.name === group.parent
          );
        }
      });

      var withIsLast = groups.filter((group) => {
        return group.groupLevel === i && group.isLastItem;
      });
      var stepOne = [];

      stepOne = [...withGroupLevel];
      stepOne.push(...withIsLast);
      useinUiGroup.push(stepOne);
      stepOne = [];

      i++;
    }
    setuiGroup(useinUiGroup);
  }, [groups, indicator]);
  console.log("uiGroup :", uiGroup);

  var render_dropDowns = uiGroup[0]?.map((drop) => {
    return (
      <div
        key={drop.id}
        className="w-24  flex justify-center items-center 
          "
      >
        <form action={makeLastItem}>
          <button
            type="submit"
            onClick={async () => {
              await setIndicator(1);
              await setUserItems({
                id: drop.id,
                groupLevel: drop.groupLevel as number,
                prevLastGroup_id: uiGroup[0][uiGroup[0].length - 1]
                  .id as string,
              });
            }}
            className={` cursor-pointer text-sm mb-[2px] overflow-auto shadow-sm shadow-[#000000]
            bg-[#FFECC5]   
text-[#4E0114] hover:text-[#FFECC5]  hover:bg-[#4E0114]
           mr-2  border-[#4E0114] border-2
         font-B_Traffic_Bold  px-2 flex justify-center items-center transition-all 
         delay-150 min-w-32 h-9 rounded-md`}
          >
            {drop.name}
          </button>
        </form>
      </div>
    );
  });
  var render_UiGroup = uiGroup.map((groupArr, index) => {
    var subGroups = groups.filter((subGroup) => {
      return subGroup.parent === groupArr[groupArr.length - 1]?.name;
    });
    var render_subGroups = subGroups.map((sub) => {
      return (
        <div className="flex justify-end px-1 py-2 " key={sub.id}>
          <form
            action={async (e) => {
              await makeLastItem(e);
            }}
            className="w-20 h-6 font-B_Traffic_Bold text-sm rounded-md
             text-[#FFECC5] border-1  cursor-pointer  border-[#FFECC5]
          flex justify-center items-center"
          >
            <button
              onClick={() => {
                setUserItems({
                  id: sub.id,
                  groupLevel: sub.groupLevel as number,
                  prevLastGroup_id: groups.find((gr) => {
                    return gr.groupLevel === sub.groupLevel && gr.isLastItem;
                  })?.id as string,
                });
                setIndicator(sub.groupLevel as number);
              }}
              type="submit"
            >
              {sub.name}
            </button>
          </form>
        </div>
      );
    });
    return (
      <div
        key={index}
        className="w-[400px] h-[150px] mb-2  rounded-md bg-[#4E0114] "
      >
        <div className="flex border-[#FFECC5] border-dashed px-2 justify-center border-b-1 py-2">
          <h1 className="text-[#FFECC5] text-base text-center font-B_Traffic_Bold">
            {groupArr.length && groupArr[groupArr.length - 1]?.name}
          </h1>
          <h1 className="text-[#FFECC5] ml-2 text-base text-center font-B_Traffic_Bold">
            گروه
          </h1>
        </div>
        <div
          className={`mt-2  flex h-auto ${
            subGroups.length > 7 && "overflow-scroll"
          } w-full items-start`}
        >
          <div className="w-full h-auto  items-center flex flex-row-reverse flex-wrap">
            {render_subGroups}
            <div className="w-28">
              <Modal_addGroup
                outCss="h-6"
                groupLevel={((groupArr[0]?.groupLevel as number) + 1) as number}
                setIndicator={setIndicator}
                parent={groupArr[groupArr.length - 1]?.name as string}
                title={`افزودن زیرگروه به ${
                  groupArr[groupArr.length - 1]?.name
                }`}
                actionButtonTitle="افزودن"
                openButtonTitle="افزودن"
                icon={
                  <div className="text-lg">
                    <BiAddToQueue />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div
      className={`${
        uiGroup.length > 2 && "overflow-scroll"
      } w-[600px] h-[400px] max-h-96  
               rounded-md  bg-[#FFECC5] mt-[98px] space-x-5 
                justify-center flex `}
    >
      {uiGroup.length ? (
        <div className="px-4 py-2">{render_UiGroup as React.ReactNode}</div>
      ) : (
        <div className="bg-[#4E0114] w-[400px] h-[200px]  rounded-md shadow-md shadow-[#000000]">
          <h1 className="flex justify-center items-center text-[#FFECC5] text-3xl">
            {" "}
            ...
          </h1>
        </div>
      )}
      <div
        className="w-full flex flex-wrap space-y-4 justify-center py-2 
       h-[100px]"
      >
        <div className="h-8">
          <Popover placement="bottom" backdrop="opaque">
            <PopoverTrigger>
              <div
                className="cursor-pointer text-sm shadow-sm shadow-[#000000]
                 text-[#FFECC5]   
bg-[#4E0114]
           mr-2  border-[#4E0114] border-2
         font-B_Traffic_Bold  px-2 flex flex-wrap justify-end items-center
          transition-all 
         delay-150 w-32 h-9 rounded-md "
              >
                <div className="px-4">
                  {uiGroup[0]?.length &&
                    uiGroup[0][uiGroup[0].length - 1]?.name}
                </div>
                <RxDropdownMenu className=" text-3xl text-right" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-transparent">
              {render_dropDowns}
            </PopoverContent>
          </Popover>
        </div>
        <Modal_addGroup
          outCss="h-9"
          parent=""
          setIndicator={setIndicator}
          groupLevel={1}
          actionButtonTitle="افزودن"
          icon={<BiAddToQueue size={20} />}
          openButtonTitle="افزودن"
          title="نام و عکس گروه را وارد کنید"
        />
      </div>
    </div>
  );
}
