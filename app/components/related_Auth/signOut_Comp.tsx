"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSignOut } from "@/app/action/signOut";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SignOutComponent({
  className,
  redirect,
  item,
}: {
  className: string;
  redirect?: boolean;
  item?: any;
}) {
  const queryclient = useQueryClient();
  const router = useRouter();
  const signOutQuery = useMutation({
    mutationFn: async () => await signOut({ redirectTo: "/" }),
    onSuccess: () => {
      // queryclient.invalidateQueries({ queryKey: ["forSession"] });
      // router.push("/");
    },
  });
  const handlesignOut = (e: any) => {
    signOutQuery.mutate();
  };
  return (
    <div>
      <form action={handlesignOut}>
        <button type="submit" className={className}>
          خروج
          {item}
        </button>
      </form>
    </div>
  );
}
