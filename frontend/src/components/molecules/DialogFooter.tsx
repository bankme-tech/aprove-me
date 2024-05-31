import { ButtonHTMLAttributes } from "react";
import { Button } from "../atoms/Button";

type DialogFooter = {
  onClose: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export const DialogFooter = ({ onClose, type }: DialogFooter) => {
  return (
    <div className="flex flex-col md:flex-row items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end w-full gap-y-4 md:gap-x-12">
      <div className="w-full md:w-2/6">
        <Button onClick={onClose} secondary>
          Cancelar
        </Button>
      </div>
      <div className="w-full md:w-2/6">
        <Button {...(type && { type })}>Cadastrar</Button>
      </div>
    </div>
  );
};
