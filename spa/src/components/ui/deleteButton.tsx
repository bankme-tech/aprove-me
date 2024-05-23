import { useState } from "react";
import Button from "./button"
import ConfirmModal from "../confirmModal";

interface Props {
  onClick: () => void;
}

export default function DeleteButton(props: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setModalIsOpen(!modalIsOpen)}
        delete
      >
        Apagar

      </Button>
      {
        modalIsOpen &&
        <ConfirmModal
        >
          <div className="bg-gradient-to-b from-cardBgColorFrom to-cardBgColorto shadow border border-borderColor flex flex-col p-3 rounded-lg gap-3">
            <h1 className="text-textColor">Tem certeza que deseja apagar?</h1>
            <div className="flex gap-1 font-medium text-sm">
              <button className="w-full p-2 border rounded border-borderColor text-textColor" onClick={() => setModalIsOpen(false)}>Cancelar</button>
              <button className="w-full p-2 bg-red-600 rounded hover:bg-opacity-80 text-text-HeaderBgColor" onClick={props.onClick}>Apagar</button>
            </div>
          </div>
        </ConfirmModal>
      }
    </>
  )
}