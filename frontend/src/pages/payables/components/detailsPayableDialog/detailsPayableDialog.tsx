import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency } from "@/lib/formatCurrency";
import { useAssignorStore } from "@/stores/useAssignorStore";
import { Payable } from "@/types/payables";
import { Telescope } from "lucide-react";
import { useEffect } from "react";

interface DetailsPayableData {
  payable: Payable;
}

export function DetailsPayableDialog({ payable }: DetailsPayableData) {
  const assignor = useAssignorStore();

  useEffect(() => {
    async function handleFindAssignor() {
      assignor.findById(payable.props.assignorId);
    }

    handleFindAssignor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPayableTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Identificador</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead className="whitespace-nowrap">Data de emissão</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>{payable._id}</TableCell>

          <TableCell>{formatCurrency(payable.props.value)}</TableCell>

          <TableCell>
            {new Date(payable.props.emissionDate).toLocaleDateString()}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  const renderAssignorTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead className="whitespace-nowrap">Criado em</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>{assignor.assignor.props?.name}</TableCell>

          <TableCell>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="max-w-16 truncate">
                  {assignor.assignor.props?.email}
                </TooltipTrigger>

                <TooltipContent>
                  {assignor.assignor.props?.email}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>

          <TableCell>{assignor.assignor.props?.document}</TableCell>

          <TableCell>{assignor.assignor.props?.phone}</TableCell>

          <TableCell>
            {new Date(assignor.assignor.props?.createdAt).toLocaleDateString()}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <Dialog>
      <DialogTrigger className="flex justify-between w-full">
        Detalhes <Telescope className="mr-2 h-4 w-4" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do pagável e cedente</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="payable">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payable">Pagável</TabsTrigger>
            <TabsTrigger value="assignor">Cedente</TabsTrigger>
          </TabsList>

          <TabsContent value="payable" className="grid place-items-center">
            {renderPayableTable()}
          </TabsContent>
          <TabsContent value="assignor" className="grid place-items-center">
            {assignor.assignor
              ? renderAssignorTable()
              : "Cedente não-encontrado"}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
