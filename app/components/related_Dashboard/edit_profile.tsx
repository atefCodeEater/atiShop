"use client";

import { useState } from "react";
import EditUsername from "./related_EditProfile/EditUsername";
import EditPassword from "./related_EditProfile/EditPassword";
import EditImage from "./related_EditProfile/EditImage";

export default function EditProfile_Components({ id }: { id: string }) {
  return (
    <div className="w-full flex justify-center mt-32 space-x-5">
      <EditImage id={id} />
      <EditPassword id={id} />
      <EditUsername id={id} />
    </div>
  );
}
