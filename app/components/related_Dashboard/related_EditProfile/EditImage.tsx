"use client";

import { useState } from "react";
import Button_Spinner from "../../ReusableComponents/ButtonSpinner";

export default function EditPassword({ id }: { id: string }) {
  const [password, setPassword] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  return (
    <div className=" w-60 h-64 border-1 rounded-lg border-opacity-50 border-dashed border-[#FFECC5] flex justify-center">
      {/* //! FOR USERNAME */}
      <form className="grid grid-cols-1  ">
        <h1 className="w-full mb-2 mt-2 text-[#FFECC5] font-B_Traffic_Bold text-center">
          {" "}
          تغییر عکس
        </h1>
        <input
          className="text-right text-sm px-1 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          onChange={(e) => setPrevPassword(e.target.value)}
          type="text"
          name="prevUsername"
          value={prevPassword || ""}
          placeholder="پسورد قبلی"
        />
        <input
          className="text-right text-sm px-1 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="prevUsername"
          value={password || ""}
          placeholder="پسورد جدید"
        />
        <div className="  flex justify-center content-center w-full h-8"></div>
        <Button_Spinner
          children="ثبت"
          className="rounded-md  font-B_Traffic_Bold
          bg-[#4E0114] text-[#FFECC5] border-1
          border-[#FFECC5]  w-[190px] "
        />
      </form>
    </div>
  );
}
