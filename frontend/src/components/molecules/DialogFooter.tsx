import { Button } from "../atoms/Button";

export const DialogFooter = ({
  confirm,
  cancel,
  onClose,
  type = "button",
}: any) => {
  return (
    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end w-full gap-x-12">
      <div className="w-2/6">
        <Button type={type}>Cadastrar</Button>
      </div>
      <div className="w-2/6">
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </div>
  );
};
