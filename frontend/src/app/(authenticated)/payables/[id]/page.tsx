'use client'

import { listPayableById } from "@/lib/server/routes/list-payable-by-id";
import { RedirectType, notFound, redirect } from "next/navigation";
import { PayablePath } from "./(components)/payable-path";
import { PayableForm } from "./(components)/payable-form";
import { AssignorCard } from "./(components)/assignor-card";
import { useQuery } from "@tanstack/react-query";

interface PayableProps {
    params: { id: string }
}

export default function Payable({ params }: PayableProps) {
    const token = localStorage.getItem('token')
    
    if(!token) redirect('/', RedirectType.replace)

    const { data: payable, isLoading } = useQuery({
        queryKey: ['payables', params.id],
        queryFn: () => listPayableById(params.id, { token }),
        retry: false,
        refetchOnWindowFocus: false
    })
    
    if(!payable && !isLoading) redirect('/payables', RedirectType.replace)

    if(!payable) return <p>Carregando...</p>

    return (
        <div className="space-y-2">
            <section className="flex flex-col items-start space-y-2">
                <PayablePath />
                <div>
                    <h1 className="text-lg">Pagável - ({ payable.id })</h1>
                    <p className="text-sm text-muted-foreground">Aqui você pode visualizar, remover ou também editar as informações do seu pagável.</p>
                </div>
            </section>

            <AssignorCard assignor={payable.assignor} />

            <PayableForm
                payableId={payable.id}
                initialValues={{
                    assignorId: payable.assignorId,
                    emissionDate: new Date(payable.emissionDate),
                    value: payable.value
                }}
            />
        </div>
    );
  }
  