"use client";

import { useState } from "react";
import Button_Spinner from "../components/ReusableComponents/ButtonSpinner";

export default function FindingPassword() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<{ message: string; fault: boolean }>({
    message: "",
    fault: false,
  });

  const handleSubmit = async (e: any) => {
    const formdata = new FormData();

    formdata.append("email", email);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/findingpassword`,
      {
        method: "POST",
        body: formdata,
      }
    );

    const message = await response.json();

    if (response.ok) {
      setMessage(message);
    }
  };
  return (
    <div
      className="w-full text-[#FFECC5] h-screen flex justify-center items-center bg-[#4E0114]  
           "
    >
      <div
        className="flex justify-center items-center border-dashed rounded-md border-1 h-1/4 
       border-[#FFECC5] w-1/5"
      >
        <div className="w-2/3  h-full mt-6">
          <h1 className="font-B_Traffic_Bold text-base h-12  text-center ">
            بازیابی رمز عبور
          </h1>

          <form action={handleSubmit} className="mt-6 w-full h-3/5">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
              className="text-right h-8 rounded-md bg-[#FFECC5] 
              font-B_Traffic_Bold text-base px-2
              w-full placeholder-[#4E0114] text-[#4E0114]"
              type="text"
              placeholder="ایمیل"
            />
            <div
              className={` h-9 text-center p-2 font-B_Traffic_Bold text-base
                ${message.fault ? "text-[#dd2d2d]" : "text-[#FFECC5]"}`}
            >
              {message.message}
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
    </div>
  );
}
