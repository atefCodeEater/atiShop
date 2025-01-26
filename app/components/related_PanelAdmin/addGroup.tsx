"use client";

import { BiAddToQueue } from "react-icons/bi";
import Modal_addGroup from "@/app/components/ReusableComponents/Modal_Components";
import { Groups } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  dropdown,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { RxDropdownMenu } from "react-icons/rx";

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
  const [uiGroup, setuiGroup] = useState<Groups[][]>([]);
  const [allGroups, setAllGroups] = useState<Groups[]>([]);

  const [indicator, setIndicator] = useState<number>(1);
  const [userItems, setUserItems] = useState<{
    id: string;
    groupLevel: number;
  }>({ id: "", groupLevel: 1 });

  const updateGroup = async (messages: any) => {
    await setAllGroups(messages.groups);
  };
  const makeLastItem = async (event: any) => {
    const formdata = new FormData();

    formdata.append("user", JSON.stringify({ userItems } as any));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/createGroup`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const message = await response.json();
    if (response.ok) {
      return setMessageUi({ message: message.message, fault: false });
    }
  };

  useEffect(() => {
    var i = 1;
    var useinUiGroup: any = [];
    while (i <= indicator) {
      var withGroupLevel = groups.filter((group) => {
        return group.groupLevel === i && !group.isLastItem;
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
  }, [groups]);
  console.log("uiGroup :", uiGroup);

  var render_dropDowns = uiGroup[0]?.map((drop) => {
    return (
      <div
        key={drop.id}
        className="w-24  flex justify-center items-center 
          "
      >
        <div
          onClick={() =>
            setUserItems({ id: drop.id, groupLevel: drop.groupLevel as number })
          }
          className="cursor-pointer text-sm mb-[2px] overflow-auto shadow-sm shadow-[#000000] bg-[#FFECC5]   
text-[#4E0114] hover:text-[#FFECC5]  hover:bg-[#4E0114]
           mr-2  border-[#4E0114] border-2
         font-B_Traffic_Bold  px-2 flex justify-center items-center transition-all 
         delay-150 min-w-32 h-9 rounded-md"
        >
          {drop.name}
        </div>
      </div>
    );
  });
  var render_UiGroup = uiGroup.map((gr) => {});
  return (
    <div
      className="w-[600px] h-auto max-h-72  
               rounded-md  bg-[#FFECC5] mt-[98px] space-x-5 
               -space-y-5 justify-center flex flex-wrap"
    >
      <div className="w-full flex justify-end py-2">
        <div>
          <Popover placement="right-start" backdrop="opaque">
            <PopoverTrigger>
              <div
                className="cursor-pointer text-sm shadow-sm shadow-[#000000] text-[#FFECC5]   
bg-[#4E0114]
           mr-2  border-[#4E0114] border-2
         font-B_Traffic_Bold  px-2 flex justify-end items-center transition-all 
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
          updateGroup={updateGroup}
          indicator={indicator}
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
