'use client';
import { payableService } from "@/services/api/payables";
import { Payable } from "@/services/api/payables/types/Payable";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, Spinner, useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import moment from "@/utils/moment";
import { Eye, PencilSimple, Plus, Trash } from "phosphor-react";
import { Key, useCallback, useState } from "react";
import CreatePayable from "./forms/payable/CreatePayable/form";
import CreateAssignor from "./forms/assignor/CreateAssignor/form";
import UpdatePayable from "./forms/payable/UpdatePayable/form";
import PayableDetails from "./PayableDetails";
import DeletePayable from "./forms/payable/DeletePayable/form";

const columns = [
  { name: "ID", uid: "id" },
  { name: "VALOR", uid: "value" },
  { name: "DATA DE EMISSÃO", uid: "emissionDate" },
  { name: "AÇÕES", uid: "actions" },
];

export default function PayablesTable() {
  const [payable, setPayable] = useState<Payable | null>(null)
  const [payableId, setPayableId] = useState<string | null>(null)

  const {
    data: payables = [],
    isLoading,
  } = useQuery({
    queryKey: ["payables"],
    queryFn: () => payableService.getAllPayables(),
  })

  const { isOpen: isOpenCreatePayable, onOpen: onOpenCreatePayable, onOpenChange: onOpenChangeCreatePayable } = useDisclosure({
    id: "create-payable",
  });

  const { isOpen: isOpenCreateAssignor, onOpen: onOpenCreateAssignor, onOpenChange: onOpenChangeCreateAssignor } = useDisclosure({
    id: "create-assignor",
  });

  const { isOpen: isOpenUpdatePayable, onOpen: onOpenUpdatePayable, onOpenChange: onOpenChangeUpdatePayable } = useDisclosure({
    id: "update-payable",
  });

  const { isOpen: isOpenPayableDetails, onOpen: onOpenPayableDetails, onOpenChange: onOpenChangePayableDetails } = useDisclosure({
    id: "details-payable",
  });

  const { isOpen: isOpenDeletePayable, onOpen: onOpenDeletePayable, onOpenChange: onOpenChangeDeletePayable } = useDisclosure({
    id: "delete-payable",
  });

  const renderCell = useCallback((payable: Payable, columnKey: Key) => {
    const cellValue = payable[columnKey as keyof Payable];

    switch (columnKey) {
      case "value":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(cellValue as number);
      case "emissionDate":
        return moment(cellValue).format("DD/MM/YYYY");
      case "actions":
        return (
          <div className="relative flex items-center">
            <Tooltip content="Detalhes">
              <Button type="button" isIconOnly variant="light" onPress={() => {
                setPayableId(payable.id)
                onOpenChangePayableDetails()
              }}>
                <Eye />
              </Button>
            </Tooltip>
            <Tooltip content="Editar">
              <Button type="button" isIconOnly variant="light" onPress={() => {
                setPayable(payable)
                onOpenUpdatePayable()
              }}>
                <PencilSimple />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Deletar">
              <Button type="button" isIconOnly variant="light" color="danger" onPress={() => {
                setPayableId(payable.id)
                onOpenChangeDeletePayable()
              }}>
                <Trash />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, [onOpenChangeDeletePayable, onOpenChangePayableDetails, onOpenUpdatePayable]);

  return (
    <>
      <Table
        aria-label="Payables table list"
        topContent={
          <div className="flex items-center justify-end gap-2">
            <Button type="button" color="primary" endContent={<Plus />} onClick={onOpenCreateAssignor}>
              Adicionar cedente
            </Button>
            <Button type="button" color="primary" endContent={<Plus />} onClick={onOpenCreatePayable}>
              Adicionar recebível
            </Button>
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={payables}
          emptyContent={"Não há recebíveis para exibir."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Carregando..." color="warning" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpenCreatePayable && <CreatePayable isOpen={isOpenCreatePayable} onOpenChange={onOpenChangeCreatePayable} />}

      {isOpenCreateAssignor && <CreateAssignor isOpen={isOpenCreateAssignor} onOpenChange={onOpenChangeCreateAssignor} />}

      {(isOpenUpdatePayable && payable) && <UpdatePayable isOpen={isOpenUpdatePayable} onOpenChange={onOpenChangeUpdatePayable} payable={payable} />}

      {(isOpenPayableDetails && payableId) && <PayableDetails isOpen={isOpenPayableDetails} onOpenChange={onOpenChangePayableDetails} payableId={payableId} />}

      {(isOpenDeletePayable && payableId) && <DeletePayable isOpen={isOpenDeletePayable} onOpenChange={onOpenChangeDeletePayable} payableId={payableId} />}
    </>
  )
}