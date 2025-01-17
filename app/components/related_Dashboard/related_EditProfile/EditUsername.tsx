"use client";

import { useState } from "react";
import Button_Spinner from "../../ReusableComponents/ButtonSpinner";
import { AiFillWechatWork } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function EditUsername({ id }: { id: string }) {
  const [username, setUsername] = useState("");
  const [prevUsername, setPrevUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("username", username);
    formdata.append("prevUsername", prevUsername);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/profileEdit_username`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const message = await response.json();
    if (response.ok) {
      setTimeout(() => {
        router.refresh();
      }, 1000);
      setMessage(message.message);
      console.log(message.message);
    }
  }
  return (
    <div className=" w-60 h-64 border-1 bg-[#4E0114] rounded-lg border-opacity-50 border-dashed border-[#FFECC5] flex justify-center">
      {/* //! FOR USERNAME */}
      <form action={handleSubmit} className="grid grid-cols-1  ">
        <h1 className="w-full mb-2 mt-2 text-[#FFECC5] font-B_Traffic_Bold text-center">
          تغییر نام کاربری
        </h1>
        <input
          className="text-right text-sm px-1 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          onChange={(e) => setPrevUsername(e.target.value)}
          type="text"
          name="prevUsername"
          value={prevUsername || ""}
          placeholder="نام کاربری قبلی"
        />
        <input
          className="text-right text-sm px-1 font-B_Traffic_Bold top-12 
                 w-[190px] left-2 rounded-sm h-8 mb-1 
                 bg-[#FFECC5] placeholder-[#4E0114] 
                border-1
                 border-[#FFECC5] "
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          value={username || ""}
          placeholder="نام کاربری جدید"
        />
        <div
          className=" h-8 flex items-center font-B_Traffic_Bold
         text-[#FFECC5] justify-center"
        >
          {message}
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
