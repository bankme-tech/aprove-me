import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { payableService } from "@/services/api/payables";
import moment from "@/utils/moment";
import { PatternFormat } from "react-number-format";

function PayableViewSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-8" />
            <div className="grid md:grid-cols-2 gap-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
            </div>
            <Skeleton className="w-full h-8" />
            <div className="grid md:grid-cols-2 gap-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
            </div>
            <div className="grid md:grid-cols-2 gap-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
            </div>
        </div>
    )
}

type PayableDetailsProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    payableId: string;
};

export default function PayableDetails({
    isOpen,
    onOpenChange,
    payableId,
}: PayableDetailsProps) {
    const {
        data: payable,
        isLoading: isLoadingPayable,
    } = useQuery({
        queryKey: ["payables", payableId],
        queryFn: () => payableService.getPayable(payableId),
        enabled: !!payableId,
    });

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Detalhes do recebível</ModalHeader>
                        <ModalBody>
                            {isLoadingPayable ? (
                                <PayableViewSkeleton />
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Input
                                        isReadOnly
                                        type="text"
                                        label="ID do recebível"
                                        variant="bordered"
                                        defaultValue={payable?.id}
                                    />
                                    <div className="grid md:grid-cols-2 gap-2">
                                        <Input
                                            isReadOnly
                                            type="text"
                                            label="Valor"
                                            variant="bordered"
                                            defaultValue={new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(payable?.value as number)}
                                        />
                                        <Input
                                            isReadOnly
                                            type="text"
                                            label="Data de emissão"
                                            variant="bordered"
                                            defaultValue={moment(payable?.emissionDate).format("DD/MM/YYYY")}
                                        />
                                    </div>
                                    <Input
                                        isReadOnly
                                        type="text"
                                        label="ID do cedente"
                                        variant="bordered"
                                        defaultValue={payable?.assignorReference.id}
                                    />
                                    <div className="grid md:grid-cols-2 gap-2">
                                        <Input
                                            isReadOnly
                                            type="text"
                                            label="Nome do cedente"
                                            variant="bordered"
                                            defaultValue={payable?.assignorReference.name}
                                        />
                                        <PatternFormat
                                            isReadOnly
                                            format="###.###.###-##"
                                            customInput={Input}
                                            defaultValue={payable?.assignorReference.document}
                                            type="text"
                                            label="Documento do cedente"
                                            variant="bordered"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        <Input
                                            isReadOnly
                                            type="text"
                                            label="E-mail do cedente"
                                            variant="bordered"
                                            defaultValue={payable?.assignorReference.email}
                                        />
                                        <PatternFormat
                                            isReadOnly
                                            format="(##) #####-####"
                                            customInput={Input}
                                            defaultValue={payable?.assignorReference.phone}
                                            type="text"
                                            label="Telefone do cedente"
                                            variant="bordered"
                                        />
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="danger" variant="light" onPress={onClose}>
                                Fechar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}