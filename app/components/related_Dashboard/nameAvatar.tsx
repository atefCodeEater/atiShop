"use client";

import { Avatar } from "@nextui-org/react";

export default function NameAndAvatar({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div
      className="flex justify-center
         space-x-4 items-center text-2xl text-[#FFECC5] font-B_Traffic"
    >
      <div>{name}</div>
      <Avatar size="lg" src={image} />
    </div>
  );
}
