import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
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
  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between',alignItems: 'center', marginBottom: '5px', padding: '5px'} }>
      

      <ModalPayable payable={payable} />
      <button>
        <TrashIcon width={'50px'}/>
      </button>

    </div>
  );
}
