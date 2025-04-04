"use client";

import Button_Spinner from "../../ReusableComponents/ButtonSpinner";
import { changeUsername } from "@/app/action/userProfile/profileEdit_username";
import { useCustomQuery } from "@/app/hooks/useQuery_customHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forSession } from "@/app/action/sessionAction";
import { Session } from "next-auth";
export default function EditUsername({
  id,
  isAdmin,
}: {
  id: string;
  isAdmin: boolean;
}) {
  const queryclient = useQueryClient();
  const session = useCustomQuery(["forSession"], forSession, {
    queryKey: ["forSession"],
    queryFn: () => forSession(),
    initialData() {
      const cacheData = queryclient.getQueryData(["forSession"]);

      if (cacheData) return cacheData;
      return undefined;
    },
  });

  const changeUsernameQuery = useMutation({ mutationFn: changeUsername });
  async function handleSubmit(e: any) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    formdata.append("id", id);
    formdata.append("isAdmin", JSON.stringify(isAdmin));
    changeUsernameQuery.mutate(formdata, {
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: ["forSession"] });
      },
    });
  }
  return (
    <div className=" w-60 h-64 border-1 bg-[#4E0114] rounded-lg border-opacity-50 border-dashed border-[#FFECC5] flex justify-center">
      {/* //! FOR USERNAME */}
      <form
        onSubmit={async (e) => handleSubmit(e)}
        className="grid grid-cols-1  "
      >
        <h1 className="w-full mb-2 mt-2 text-[#FFECC5] font-B_Traffic_Bold text-center">
          تغییر نام کاربری
        </h1>
        <input
          className="text-right text-sm px-1 placeholder:opacity-35 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          type="text"
          name="prevUsername"
          placeholder={
            (session.data as Session)?.user?.name || "نام کاربری قبلی"
          }
        />
        <input
          className="text-right text-sm px-1 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          type="text"
          name="username"
          placeholder="نام کاربری جدید"
        />
        <div
          className={`h-8 flex items-center font-B_Traffic_Bold
         ${
           changeUsernameQuery.isError ? "text-red-500" : "text-[#FFECC5]"
         }  justify-center`}
        >
          {changeUsernameQuery.isError
            ? JSON.parse(changeUsernameQuery.error.message as string).map(
                (mess: any) => {
                  return (
                    <div key={mess}>
                      <div>{mess}</div>
                    </div>
                  );
                }
              )
            : changeUsernameQuery.data?.message}
        </div>

        <Button_Spinner
          children="ثبت"
          className="rounded-md text-lg font-B_Traffic_Bold
          bg-[#4E0114] text-[#FFECC5] border-1
          border-[#FFECC5]  w-[190px] "
        />
      </form>
    </div>
  );
}
