import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { Api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

interface ShowReceivableProps {
  id: string;
}

export const ShowReceivable = ({ id }: ShowReceivableProps) => {
  const { data, refetch } = useQuery({
    queryKey: [`receivable-${id}`, 'receivable-id'],
    queryFn: () => Api.getReceivable(id),
    enabled: false,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={() => refetch()}>
          <ArrowRight className="size-3" />
          <span className="sr-only">ir para detalhes</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações sobre o recebível</DialogTitle>
        </DialogHeader>

        <div className="">
          <p className="font-medium">Id:</p>
          <span>{data?.id}</span>
        </div>

        <div className="">
          <p className="font-medium">Valor:</p>
          <span>R$ {data?.value}</span>
        </div>

        <div className="">
          <p className="font-medium">Data de Emissao:</p>
          <span>{format(new Date(), 'HH:mm dd/MM/yyyy')}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
