import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { UpdatePayableSchema, UpdatePayableType } from "./schema";
import { Autocomplete, AutocompleteItem, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { assignorService } from "@/services/api/assignors";
import { payableService } from "@/services/api/payables";
import { getLocalTimeZone, parseAbsolute } from "@internationalized/date";
import { toast } from "react-toastify";
import { queryClient } from "@/app/provider";
import { Payable } from "@/services/api/payables/types/Payable";

type UpdatePayableProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    payable: Payable;
};

export default function UpdatePayable({
    isOpen,
    onOpenChange,
    payable,
}: UpdatePayableProps) {
    const {
        data: assignors = [],
        isLoading: isLoadingAssignors,
    } = useQuery({
        queryKey: ["assignors"],
        queryFn: () => assignorService.getAllAssignors(),
    });

    const {
        mutateAsync,
        isPending
    } = useMutation({
        mutationKey: ["payables"],
        mutationFn: (data: UpdatePayableType) => payableService.updatePayable(payable.id, data),
    });

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<UpdatePayableType>({
        resolver: zodResolver(UpdatePayableSchema),
        defaultValues: {
            value: payable?.value,
            emissionDate: new Date(payable?.emissionDate),
            assignor: payable?.assignor,
        },
    });

    const onSubmit = async (data: UpdatePayableType) => {
        mutateAsync(data, {
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
                        <ModalHeader className="flex flex-col gap-1">Adicionar recebível</ModalHeader>
                        <ModalBody>
                            <Controller
                                name="value"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <NumericFormat
                                        prefix="R$ "
                                        decimalScale={2}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        fixedDecimalScale
                                        allowNegative={false}
                                        customInput={Input}
                                        onValueChange={(v) => onChange(v.value)}
                                        value={value}
                                        errorMessage={errors.value?.message}
                                        isInvalid={Boolean(errors.value)}
                                        label="Valor"
                                        variant="bordered"
                                        isRequired
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="emissionDate"
                                render={({ field: { value, onChange } }) => (
                                    <DatePicker
                                        label="Data de emissão"
                                        variant="bordered"
                                        isInvalid={Boolean(errors.emissionDate)}
                                        errorMessage={errors.emissionDate?.message}
                                        granularity="day"
                                        value={
                                            value
                                                ? parseAbsolute(value.toISOString(), getLocalTimeZone())
                                                : undefined
                                        }
                                        onChange={(value) => onChange(value.toDate())}
                                        showMonthAndYearPickers
                                        isRequired
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="assignor"
                                render={({ field: { value, onChange } }) => (
                                    <Autocomplete
                                        label="Cedente"
                                        variant="bordered"
                                        defaultItems={assignors}
                                        placeholder="Selecione um cedente"
                                        selectedKey={value}
                                        onSelectionChange={onChange}
                                        isInvalid={Boolean(errors.assignor)}
                                        errorMessage={errors.assignor?.message}
                                        isLoading={isLoadingAssignors}
                                        isRequired
                                    >
                                        {(item) => (
                                            <AutocompleteItem key={item.id} value={item.id}>
                                                {item.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="danger" variant="light" onPress={onClose}>
                                Fechar
                            </Button>
                            <Button type="submit" color="primary" isLoading={isPending}>
                                Editar
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}