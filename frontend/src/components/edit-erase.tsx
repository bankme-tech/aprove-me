import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

export default function EditErase() {

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between',alignItems: 'center', marginBottom: '5px', padding: '5px'} }>
      <button type="button">
        <Pencil1Icon width={'50px'}/>
      </button>
      <button>
        <TrashIcon width={'50px'}/>
      </button>
    </div>
  );
}
