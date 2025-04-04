"use client";

import { changePassword } from "@/app/action/userProfile/profileEdit_password";
import Button_Spinner from "../../ReusableComponents/ButtonSpinner";

import { useMutation } from "@tanstack/react-query";

export default function EditPassword({
  id,
  isAdmin,
}: {
  id: string;
  isAdmin: boolean;
}) {
  const changePasswordQuey = useMutation({
    mutationFn: changePassword,
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    formdata.append("id", id);
    changePasswordQuey.mutate(formdata);
  }
  const errorsMessage =
    changePasswordQuey.error &&
    JSON.parse(changePasswordQuey.error?.message as string);
  console.log("changePasswordQuey.error?.message : ", changePasswordQuey.error);
  return (
    <div className=" w-60 h-64 border-1 bg-[#4E0114] rounded-lg border-opacity-50 border-dashed border-[#FFECC5] flex justify-center">
      {/* //! FOR USERNAME */}
      <form
        onSubmit={async (e) => await handleSubmit(e)}
        className="grid grid-cols-1  "
      >
        <h1 className="w-full mb-2 mt-2 text-[#FFECC5] font-B_Traffic_Bold text-center">
          {" "}
          تغییر پسورد
        </h1>
        <input
          className="text-right text-sm px-1 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          type="text"
          name="prevPassword"
          placeholder="پسورد قبلی"
        />
        <input
          className="text-right text-sm px-1 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          type="text"
          name="password"
          placeholder="پسورد جدید"
        />
        <div
          className={`h-8  text-sm text-center font-B_Traffic_Bold
         ${
           changePasswordQuey.isError ? "text-[#df2c59]" : "text-[#FFECC5]"
         }  justify-center`}
        >
          {errorsMessage
            ? errorsMessage?.map((mes: any) => {
                return (
                  <div className="" key={mes}>
                    <div>{mes}</div>
                  </div>
                );
              })
            : changePasswordQuey.data?.message}
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
