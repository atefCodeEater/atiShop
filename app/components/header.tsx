"use server";

import { Button } from "@nextui-org/react";
import SigninComponent from "./related_Auth/signin_Comp";
import SignOutComponent from "./related_Auth/signOut_Comp";
import SignUpComponent from "./related_Auth/signUp_Comp";
import Profile_component from "./profile_component";

import { auth } from "../auth";
import Link from "next/link";
import { paths } from "../paths";
export default async function Header() {
  const session = await auth();
  console.log("session.user : ", session?.user);

  return (
    <div
      className={`w-2/3 font-B_Traffic_Bold bg-[#4E0114] h-16 grid grid-cols-3 rounded-md`}
    >
      <div className=" flex justify-start px-6 items-center ">
        <div className="text-[#FFECC5] font-B_Traffic_Bold text-lg">
          atiShop
        </div>
      </div>
      <div>profile</div>
      <div className=" flex justify-end items-center space-x-2 mr-2">
        {session?.user ? (
          <div className=" flex justify-end items-center space-x-2 mr-2">
            {session.user?.isAdmin ? (
              <Link
                className="bg-[#4E0114]  cursor-pointer ml-2 mr-2
          border-1 border-[#FFECC5] transition-all delay-150 hover:bg-[#FFECC5] 
           hover:text-[#4E0114] text-sm
          rounded-md h-6 text-center p-[0/4px] text-[#FFECC5] min-w-32 w-auto px-4"
                href={paths.panelAdmin()}
              >
                {" "}
                پنل ادمین
              </Link>
            ) : (
              <Profile_component
                name={session.user.name as string}
                id={session.user.id as string}
                image={session.user.image as string}
              />
            )}
            <SignOutComponent
              className="bg-[#4E0114]  cursor-pointer ml-2 mr-2
          border-1 border-[#FFECC5] transition-all delay-150 hover:bg-[#FFECC5]  hover:text-[#4E0114] 
          rounded-md h-8 text-center p-[0/4px] text-[#FFECC5] w-24"
            />
          </div>
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
