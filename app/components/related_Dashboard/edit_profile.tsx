"use client";

import { useState } from "react";
import EditUsername from "./related_EditProfile/EditUsername";
import EditPassword from "./related_EditProfile/EditPassword";
import EditImage from "./related_EditProfile/EditImage";

export default function EditProfile_Components({ id }: { id: string }) {
  return (
    <div className="w-[775px] h-[46%] flex justify-center items-center rounded-md bg-[#FFECC5]  mt-32 space-x-5">
      <div className="shadow-[#000000] shadow-md rounded-lg">
        <EditImage id={id} />
      </div>
      <div className="shadow-[#000000] shadow-md rounded-lg">
        <EditPassword id={id} />
      </div>
      <div className="shadow-[#000000] shadow-md rounded-lg">
        <EditUsername id={id} />
      </div>
    </div>
  );
}
