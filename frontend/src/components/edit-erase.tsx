"use client";

import useDeletePayable from "@/app/hooks/useDeletePayable";
import { Button } from "@nextui-org/react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
type EditEraseProps = {
  props: {
    payable: {
      id: string;
      value: string;
      emissionDate: string;
      assignorId: string;
    };
    isOpen: {id: string, isOpen: boolean};
    setIsOpen: (value: {id: string, isOpen: boolean}) => void;
  };
};

export default function EditErase({ props }: EditEraseProps) {
  const { push } = useRouter();

  const { mutate: deleteMutate } = useDeletePayable();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "5px",
        padding: "5px",
      }}
    >
      <Button color="default" onClick={() => props.setIsOpen({id:props.payable.id, isOpen: !props.isOpen.isOpen})}>
        <Pencil1Icon />
      </Button>

      <Button
        onClick={() => {
          deleteMutate(props.payable.id);
          push("/payables");
        }}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}
