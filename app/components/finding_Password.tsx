"use client";

import { FormEvent, FormEventHandler, useState } from "react";
import Button_Spinner from "../components/ReusableComponents/ButtonSpinner";
import { findingPassword } from "@/app/action/findingPassword";
import { useMutation } from "@tanstack/react-query";

export default function FindingPassword() {
  const findPassQUERY = useMutation({ mutationFn: findingPassword });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    findPassQUERY.mutate(formdata, {});
  };
  return (
    <div
      className="flex justify-center items-center border-dashed rounded-md border-1  h-1/2
       border-[#FFECC5] w-1/5"
    >
      <div className="w-2/3  h-full mt-6">
        <h1 className="font-B_Traffic_Bold text-base h-12  text-center ">
          بازیابی رمز عبور
        </h1>

        <form
          onSubmit={async (e) => await handleSubmit(e)}
          className="mt-6 w-full h-3/5"
        >
          <input
            name="email"
            className="text-right h-8 rounded-md bg-[#FFECC5] 
              font-B_Traffic_Bold text-base px-2
              w-full placeholder-[#4E0114] text-[#4E0114]"
            type="text"
            placeholder="ایمیل"
          />
          <div
            className={` h-9 text-center p-2 font-B_Traffic_Bold text-base
                ${findPassQUERY.error ? "text-[#dd2d2d]" : "text-[#FFECC5]"}`}
          >
            {findPassQUERY.data?.message || findPassQUERY.error?.message}
          </div>
          <Button_Spinner
            children="بازیابی"
            className="rounded-md mt-4 ml-8 font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5]  w-[190px] "
          />
        </form>
      </div>
    </div>
  );
}
