'use client'

import Loading from "@/app/assignor/loading";
import useDeletePayable from "@/app/hooks/useDeletePayable";
import useGetAssignors from "@/app/hooks/useGetAssignors";
import { Button } from "@nextui-org/react";
import { TrashIcon } from "@radix-ui/react-icons";
import ModalPayable from "./modal-payable";
type EditEraseProps = {
  payable: {
    id: string;
    value: string;
    emissionDate: string;
    assignorId: string;
  };
}


export default function EditErase({ payable }: EditEraseProps) {

  const {data: assignors, isLoading } = useGetAssignors();
  const {mutate: deleteMutate} = useDeletePayable();

  if (isLoading) return <Loading />;
  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between',alignItems: 'center', marginBottom: '5px', padding: '5px'} }>
      <ModalPayable payable={payable} assignors={assignors} />
      <Button onClick={() => deleteMutate(payable.id)}><TrashIcon /></Button>
    </div>
  );
}
