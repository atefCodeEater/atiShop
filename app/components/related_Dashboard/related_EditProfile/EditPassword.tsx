"use client";

import { useState } from "react";
import Button_Spinner from "../../ReusableComponents/ButtonSpinner";
import { useRouter } from "next/navigation";

export default function EditPassword({ id }: { id: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<any>("");

  const [prevPassword, setPrevPassword] = useState("");
  const router = useRouter();
  async function handleSubmit(e: any) {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("password", password);
    formdata.append("prevPassword", prevPassword);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/profileEdit_password`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const message = await response.json();
    if (response.ok) {
      setMessage(message);
      console.log(message.message);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  }
  return (
    <div className=" w-60 h-64 border-1 bg-[#4E0114] rounded-lg border-opacity-50 border-dashed border-[#FFECC5] flex justify-center">
      {/* //! FOR USERNAME */}
      <form action={handleSubmit} className="grid grid-cols-1  ">
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
          onChange={(e) => setPrevPassword(e.target.value)}
          type="text"
          name="prevPassword"
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
        <div
          className={`h-8  text-sm text-center font-B_Traffic_Bold
         ${
           message.fault ? "text-[#df2c59]" : "text-[#FFECC5]"
         }  justify-center`}
        >
          {message.message?.map((mes: any) => {
            return (
              <div className="" key={mes}>
                <div>{mes}</div>
              </div>
            );
          })}
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
