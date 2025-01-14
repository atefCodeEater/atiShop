"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSignOut } from "@/app/action/signOut";
import { useRouter } from "next/navigation";

export default function SignOutComponent() {
  const router = useRouter();
  const handlesignOut = async (e: any) => {
    await useSignOut();
    return router.refresh();
  };
  return (
    <div>
      <form action={handlesignOut}>
        <Button
          type="submit"
          className="bg-[#4E0114]  cursor-pointer ml-2 mr-2
          border-1 border-[#FFECC5] transition-all delay-150 hover:bg-[#FFECC5]  hover:text-[#4E0114] 
          rounded-md h-8 text-center p-[0/4px] text-[#FFECC5] w-24"
        >
          خروج
        </Button>
      </form>
    </div>
  );
}
