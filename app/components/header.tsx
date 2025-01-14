"use server";

import { Button } from "@nextui-org/react";
import SigninComponent from "./related_Auth/signin_Comp";
import SignOutComponent from "./related_Auth/signOut_Comp";
import SignUpComponent from "./related_Auth/signUp_Comp";

import { auth } from "../auth";
export default async function Header() {
  const session = await auth();
  console.log(session?.user);

  return (
    <div
      className={`w-2/3 font-B_Traffic_Bold bg-[#4E0114] h-16 grid grid-cols-3 rounded-md`}
    >
      <div className="">1</div>
      <div>profile</div>
      <div className=" flex justify-end items-center space-x-2 mr-2">
        {session?.user ? (
          <SignOutComponent />
        ) : (
          <div className=" flex justify-end items-center space-x-2 mr-2">
            <SigninComponent />
            <SignUpComponent />
          </div>
        )}
      </div>
    </div>
  );
}
