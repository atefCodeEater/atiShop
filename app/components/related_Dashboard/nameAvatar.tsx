"use client";

import { Avatar } from "@nextui-org/react";

export default function NameAndAvatar({
  title,
  image,
}: {
  title: string;

  image: string;
}) {
  return (
    <div
      className="flex justify-center
         space-x-4 items-center text-xl text-[#FFECC5] font-B_Traffic"
    >
      <div> {title} </div>
      <Avatar size="lg" src={image} />
    </div>
  );
}
