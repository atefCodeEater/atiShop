"use client";

import { BiAddToQueue, BiTrash } from "react-icons/bi";
import Modal_addGroup from "@/app/components/ReusableComponents/Modal_Components";
import Modal_deleteGroup from "@/app/components/ReusableComponents/Modal_Components";
import { cache, Suspense, useMemo } from "react";
import { Groups } from "@prisma/client";
import React, { useEffect, useState } from "react";
// import { handleSubmit } from "@/app/queries/Submit_forGroup";
import { deleteGroup } from "@/app/queries/deleteGroup";

import {
  Avatar,
  dropdown,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { RxDropdownMenu } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Skeleton_comp from "../ReusableComponents/skeleton";
import { useFormStatus } from "react-dom";
import { FcDeleteDatabase } from "react-icons/fc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCustomQuery } from "@/app/hooks/useQuery_customHook";
import { fetchGroupsQuery } from "@/app/action/relatedGroups/fetchGroups";
import { createGroup } from "@/app/action/relatedGroups/createGroup";
import { makeLastItems } from "@/app/action/relatedGroups/makeLastItem";

import { date } from "zod";

export default function AddGroup({ id }: { id: string }) {
  const queryclient = useQueryClient();

  const allGroups = useCustomQuery(["groups"], fetchGroupsQuery, {
    queryKey: ["groups"],
    queryFn: () => fetchGroupsQuery(),
    refetchOnMount: false,
    select(data) {
      // if (!allGroups.isLoading) {
      var i = 1;
      var useinUiGroup: any = [];
      var groups = [...(data as Groups[])];
      while (i <= indicator) {
        var withGroupLevel = groups?.filter((group) => {
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

        var withIsLast = groups?.filter((group) => {
          return group.groupLevel === i && group.isLastItem;
        });
        var stepOne = [];

        stepOne = [...(withGroupLevel as any)];
        stepOne.push(...(withIsLast as any));
        useinUiGroup.push(stepOne);
        stepOne = [];

        i++;
        // }

        // return useinUiGroup;
      }

      setuiGroup(useinUiGroup);

      return data;
    },
  });

  const addGroupQuery = useMutation({ mutationFn: createGroup });

  const [uiGroup, setuiGroup] = useState<Groups[][]>([]);

  const [indicator, setIndicator] = useState<number>(1);

  const makeLastItemQuery = useMutation({ mutationFn: makeLastItems });

  const handleLastItem = (
    e: any,
    groupLevel: number,
    id: string,
    prevLastGroup_id: string
  ) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const userItems = {
      id: id,
      groupLevel: groupLevel,
      prevLastGroup_id: prevLastGroup_id,
    };
    formdata.append("user", JSON.stringify(userItems as any));
    makeLastItemQuery.mutate(formdata, {
      onSuccess: (data: any) => {
        console.log("onSuccess data : ", data);
        // queryclient.invalidateQueries({ queryKey: ["groups"] });
        queryclient.setQueryData(["groups"], (oldData: Groups[]) => {
          const result = oldData.map((group) => {
            if (group.id === prevLastGroup_id) {
              return { ...group, isLastItem: false };
            }
            if (group.id === data.id) {
              return { ...group, isLastItem: true };
            }
            return group;
          });

          console.log("result : ", result);

          return result;
        });
        // setIndicator(groupLevel as number);
      },
    });
  };
  console.log("uigroup : ", uiGroup);
  var render_dropDowns = uiGroup[0]?.map((drop) => {
    return (
      <div
        key={drop.id}
        className="w-24  flex justify-center items-center 
          "
      >
        <form
          onSubmit={(e) => {
            handleLastItem(
              e,
              drop.groupLevel as number,
              drop.id,
              uiGroup[0][uiGroup[0].length - 1].id as string
            );
          }}
        >
          <button
            type="submit"
            onClick={async () => {
              await setIndicator(1);
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
    var groups = allGroups.data as Groups[];
    var subGroups = groups?.filter((subGroup) => {
      return subGroup.parent === groupArr[groupArr.length - 1]?.name;
    });
    var render_subGroups = subGroups?.map((sub) => {
      return (
        <div className="flex justify-end px-1 py-2 " key={sub.id}>
          <form
            onSubmit={(e) => {
              handleLastItem(
                e,
                sub.groupLevel as number,
                sub.id,
                groups?.find((gr) => {
                  return gr.groupLevel === sub.groupLevel && gr.isLastItem;
                })?.id as string
              );
            }}
            className="w-20 h-6 font-B_Traffic_Bold text-sm rounded-md
             text-[#FFECC5] border-1  cursor-pointer  border-[#FFECC5]
          flex justify-center items-center"
          >
            <button
              onClick={() => {
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
        className="w-[400px] h-[200px] mb-4  rounded-md bg-[#4E0114] "
      >
        <div
          className="flex w-full  border-[#FFECC5] border-dashed px-2 justify-center items-center 
        space-x-2 border-b-1 py-2"
        >
          <h1 className="text-[#FFECC5] w-auto  text-base text-center font-B_Traffic_Bold">
            {groupArr.length && groupArr[groupArr.length - 1]?.name}
          </h1>
          <h1 className="text-[#FFECC5] ml-2 text-base text-center font-B_Traffic_Bold">
            گروه
          </h1>
          <Avatar
            className=" rounded-md"
            alt={
              (groupArr.length &&
                (groupArr[groupArr.length - 1]?.name as string)) ||
              ""
            }
            src={
              (groupArr.length &&
                (groupArr[groupArr.length - 1]?.image as string)) ||
              ""
            }
          />
          <div
            className="border-2 border-[#aa1717] transition-all delay-150 cursor-pointer 
            text-xl  w-8 h-8 flex
           hover:text-2xl justify-center items-center  rounded-md"
          >
            <Modal_deleteGroup
              parent=""
              id={groupArr[groupArr.length - 1]?.id as string}
              groups={groups as Groups[]}
              Query={deleteGroup as any}
              outCss="h-9"
              name={
                (groupArr.length &&
                  (groupArr[groupArr.length - 1]?.name as string)) ||
                ""
              }
              setIndicator={setIndicator}
              groupLevel={
                groupArr.length &&
                (groupArr[groupArr.length - 1]?.groupLevel as number)
              }
              actionButtonTitle="حذف"
              openButtonTitle="حذف"
              title="نام و عکس گروه را وارد کنید"
              icon={<BiTrash className="text-[#aa1717]  " />}
            />
          </div>
        </div>
        <div
          className={`mt-2  flex h-[120px]  ${
            subGroups && subGroups?.length > 11 && " overflow-y-scroll"
          } w-full items-start`}
        >
          <div
            className={`w-full h-auto  items-center flex flex-row-reverse flex-wrap`}
          >
            {render_subGroups}
            <div className="w-28">
              <Modal_addGroup
                groups={groups as Groups[]}
                Query={addGroupQuery as any}
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
        uiGroup.length > 2 && "overflow-x-hidden overflow-y-scroll"
      } w-[600px] h-[440px] 
               rounded-md  bg-[#FFECC5] mt-[98px] space-x-5 
                justify-center flex `}
    >
      <div className="px-4 py-2">
        {!uiGroup.length ? (
          <Skeleton_comp
            outCss="w-[380px] bg-[#4E0114] ml-6 mt-2 h-[120px] space-y-5 p-4"
            numOfRow={4}
            rowCss="bg-[#4E0114] h-12 rounded-lg"
          />
        ) : (
          (render_UiGroup as React.ReactNode)
        )}
      </div>

      <div
        className="w-full flex flex-wrap  space-y-12 justify-center  py-2 
       h-[100px]"
      >
        <div className="h-8 fixed">
          <Popover placement="bottom" backdrop="opaque">
            <PopoverTrigger>
              <div
                className="cursor-pointer  text-sm shadow-sm shadow-[#000000]
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
            <PopoverContent className="bg-transparent ">
              {render_dropDowns}
            </PopoverContent>
          </Popover>
        </div>
        <div className="fixed ">
          <Modal_addGroup
            groups={allGroups.data as Groups[]}
            Query={addGroupQuery as any}
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
    </div>
  );
}
