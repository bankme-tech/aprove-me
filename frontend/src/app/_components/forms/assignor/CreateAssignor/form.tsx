import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { CreateAssignorSchema, CreateAssignorType } from "./schema";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { PatternFormat } from "react-number-format";
import { useMutation } from "@tanstack/react-query";
import { assignorService } from "@/services/api/assignors";
import { toast } from "react-toastify";

interface CreateAssignorProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CreateAssignor({
    isOpen,
    onOpenChange,
}: CreateAssignorProps) {
    const {
        mutateAsync,
        isPending
    } = useMutation({
        mutationKey: ["assignors"],
        mutationFn: (data: CreateAssignorType) => assignorService.createAssignor(data),
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CreateAssignorType>({
        resolver: zodResolver(CreateAssignorSchema),
    });

    const onSubmit = async (data: CreateAssignorType) => {
        await mutateAsync(data, {
            onSuccess: () => {
                reset()
                onOpenChange(false)
                toast.success("Recebível adicionado com sucesso!")
            },
            onError: () => toast.error("Erro ao adicionar recebível"),
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
                                name="document"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <PatternFormat
                                        format="###.###.###-##"
                                        customInput={Input}
                                        onValueChange={(v) => onChange(v.value)}
                                        value={value}
                                        errorMessage={errors.document?.message}
                                        isInvalid={Boolean(errors.document)}
                                        label="Documento"
                                        variant="bordered"
                                        isRequired
                                    />
                                )}
                            />
                            <Input
                                label="Nome"
                                variant="bordered"
                                errorMessage={errors.name?.message}
                                isInvalid={Boolean(errors.name)}
                                isRequired
                                {...register("name")}
                            />
                            <Input
                                label="E-mail"
                                variant="bordered"
                                errorMessage={errors.email?.message}
                                isInvalid={Boolean(errors.email)}
                                isRequired
                                {...register("email")}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <PatternFormat
                                        format="(##) #####-####"
                                        customInput={Input}
                                        onValueChange={(v) => onChange(v.value)}
                                        value={value}
                                        label="Telefone"
                                        variant="bordered"
                                        errorMessage={errors.phone?.message}
                                        isInvalid={Boolean(errors.phone)}
                                        isRequired
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="danger" variant="light" onPress={onClose}>
                                Fechar
                            </Button>
                            <Button type="submit" color="primary" isLoading={isPending}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}