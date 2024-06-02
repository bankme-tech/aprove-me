import { PlusIcon } from "@radix-ui/react-icons";

import { DropDownMenu } from "../../../../Components/DropDownMenu";
import { IncomeIcon } from "../../../../Components/icons/Income";
import { AssignorIcon } from "../../../../Components/icons/AssignorIcon";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function Fab() {
  const { openNewAssignorModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropDownMenu.Root>
        <DropDownMenu.Trigger>
          <button className="bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center text-white">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropDownMenu.Trigger>

        <DropDownMenu.Content>
          <DropDownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal()}
          >
            <IncomeIcon />
            Novo Recebível
          </DropDownMenu.Item>

          <DropDownMenu.Item className="gap-2" onSelect={openNewAssignorModal}>
            <AssignorIcon />
            Novo Cedente
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu.Root>
    </div>
  );
}
