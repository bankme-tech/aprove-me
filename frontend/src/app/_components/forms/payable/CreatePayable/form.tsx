import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { CreatePayableSchema, CreatePayableType } from "./schema";
import { Autocomplete, AutocompleteItem, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { assignorService } from "@/services/api/assignors";
import { parseDate } from "@internationalized/date";
import { payableService } from "@/services/api/payables";

interface CreatePayableProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CreatePayable({
    isOpen,
    onOpenChange,
}: CreatePayableProps) {
    const {
        data: assignors = [],
    } = useQuery({
        queryKey: ["assignors"],
        queryFn: () => assignorService.getAllAssignors(),
    });

    const {
        mutate,
        isPending
    } = useMutation({
        mutationKey: ["payables"],
        mutationFn: (data: CreatePayableType) => payableService.createPayable(data),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreatePayableType>({
        resolver: zodResolver(CreatePayableSchema),
    });

    const onSubmit = async (data: CreatePayableType) => {
        mutate(data);
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
                                defaultValue={0}
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
                                        isInvalid={!!errors.emissionDate}
                                        errorMessage={errors.emissionDate?.message}
                                        value={value ? parseDate(value.toISOString()) : null}
                                        onChange={onChange}
                                        showMonthAndYearPickers
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
                                    >
                                        {(item) => (
                                            <AutocompleteItem key={item.id}>
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
                            <Button type="submit" color="primary" onPress={onClose} isLoading={isPending}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}