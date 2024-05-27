'use client'

import useDeletePayable from "@/app/hooks/useDeletePayable";
import { Button } from "@nextui-org/react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
type EditEraseProps = {
 props: {
   payable: {
     id: string;
     value: string;
     emissionDate: string;
     assignorId: string;
   };
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
 }
}


export default function EditErase({ props }: EditEraseProps) {
  
  const {mutate: deleteMutate} = useDeletePayable();

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between',alignItems: 'center', marginBottom: '5px', padding: '5px'} }>
     
     <Button color="default" onClick={() => props.setIsOpen(!props.isOpen)}>
        <Pencil1Icon />
      </Button>
     
   
      <Button onClick={() => deleteMutate(props.payable.id)}><TrashIcon /></Button>
    </div>
  );
}
