"use client";

import { Button, Spinner } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
Spinner;
export default function Button_Spinner({
  className,
  onClick,
  children,
}: {
  className: string;
  onClick?: any;
  children: string;
}) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        type="submit"
        spinner={pending}
        className={className}
        onPress={onClick}
      >
        {pending ? <Spinner size="md" color="danger" /> : children}
      </Button>
    </div>
  );
}
