'use client';
import { payableService } from "@/services/api/payables";
import { Payable } from "@/services/api/payables/types/Payable";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, Spinner, useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import moment from "@/utils/moment";
import { Eye, PencilSimple, Plus, Trash } from "phosphor-react";
import { Key, useCallback } from "react";
import CreatePayable from "./forms/payable/CreatePayable/form";
import CreateAssignor from "./forms/assignor/CreateAssignor/form";

const columns = [
  { name: "ID", uid: "id" },
  { name: "VALOR", uid: "value" },
  { name: "DATA DE EMISSÃO", uid: "emissionDate" },
  { name: "AÇÕES", uid: "actions" },
];

export default function PayablesTable() {
  const {
    data: payables = [],
    isLoading,
    isError,
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
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalhes">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Eye />
              </span>
            </Tooltip>
            <Tooltip content="Editar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <PencilSimple />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deletar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, []);

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
    </>
  )
}