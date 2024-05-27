import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { DeletePayableSchema, DeletePayableType } from "./schema";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { payableService } from "@/services/api/payables";
import { toast } from "react-toastify";
import { queryClient } from "@/app/provider";

type DeletePayableProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    payableId: string;
};

export default function DeletePayable({
    isOpen,
    onOpenChange,
    payableId,
}: DeletePayableProps) {
    const {
        mutateAsync,
        isPending
    } = useMutation({
        mutationKey: ["payables"],
        mutationFn: () => payableService.deletePayable(payableId),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<DeletePayableType>({
        resolver: zodResolver(DeletePayableSchema),
    });

    const onSubmit = async () => {
        mutateAsync(undefined, {
            onSuccess: () => {
                reset()
                onOpenChange(false);
                toast.success("Recebível editado com sucesso")
                queryClient.invalidateQueries({
                    queryKey: ["payables"],
                })
            },
            onError: () => toast.error("Erro ao editar recebível")
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">Deletar recebível</ModalHeader>
                        <ModalBody>
                            <Controller
                                control={control}
                                name="confirm"
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        label="Digite 'confirmar' para deletar o recebível"
                                        variant="bordered"
                                        errorMessage={errors.confirm?.message}
                                        isRequired
                                        isInvalid={Boolean(errors.confirm)}
                                        value={value}
                                        onValueChange={(v) => onChange(v.toLowerCase())}
                                        maxLength={9}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="danger" variant="light" onPress={onClose}>
                                Fechar
                            </Button>
                            <Button type="submit" color="primary" isLoading={isPending} isDisabled={!isValid}>
                                Deletar
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}