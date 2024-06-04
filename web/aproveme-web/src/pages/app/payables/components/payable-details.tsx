import { useQuery } from '@tanstack/react-query'

import { getPayable, GetPayableBody } from '@/api/get-payable'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

import { AssignorData } from './assignor-data'
import { PayableData } from './payable-data'

interface PayableDetailsProps {
  payableId: string
}

export const PayableDetails = ({ payableId }: PayableDetailsProps) => {
  const { data: payableDetail, isLoading: isPayableLoading } =
    useQuery<GetPayableBody>({
      queryKey: ['payable-detail', payableId],
      queryFn: () => getPayable(payableId),
      staleTime: Infinity, // Em quanto tempo essa informação se torna obsoleta,
      enabled: !!payableId, // Habilita a query apenas se payableId estiver disponível
    })

  return (
    <>
      <DialogContent>
        {payableDetail && (
          <>
            <DialogHeader className="flex flex-row items-baseline gap-1">
              <DialogTitle>Detalhes do recebível:</DialogTitle>

              <DialogDescription className="flex  text-sm">
                &nbsp;
                {isPayableLoading ? (
                  <Skeleton className="h-4 w-64" />
                ) : (
                  payableId
                )}
              </DialogDescription>
            </DialogHeader>

            <section className="space-y-6">
              {/* {Dados do Recebível} */}
              <PayableData payableId={payableId} />

              {/* {Dados do Cedente} */}
              <AssignorData payableId={payableId} />
            </section>
          </>
        )}
      </DialogContent>
    </>
  )
}
