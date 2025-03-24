"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSignOut } from "@/app/action/signOut";
import { useRouter } from "next/navigation";

export default function SignOutComponent({
  className,
  redirect,
  item,
}: {
  className: string;
  redirect?: boolean;
  item?: any;
}) {
  const handlesignOut = async (e: any) => {
    await useSignOut();
  };
  return (
    <div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          signOut();
        }}
      >
        <button type="submit" className={className}>
          خروج
          {item}
        </button>
      </form>
    </div>
  );
}
