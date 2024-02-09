'use client';

import { useRef, useState } from "react";
import Input from "../_components/Input";
import { Button } from "primereact/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "./_actions/auth";
import { Toast } from "primereact/toast";
import { FieldValues, useForm } from "react-hook-form";

const Home = () => {
    const toastRef = useRef<any>(null);

    const { control, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const showToastError = (message: string) => {
        toastRef.current.show({
            severity: 'error', summary: 'Error!', detail: message
        });
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            setIsLoading(true);

            const result = await auth(data.login, data.password);

            if (result?.error) {
                for (let i = 0; i < result.message.length; i++) {
                    showToastError(result.message[i]);
                }
                return;
            }

            if (!result?.access_token) {
                showToastError('Usuário não encontrado!');
                return;
            }

            localStorage.setItem("token", result.access_token);

            router.push('/assignors');
        } catch (e: any) {
            showToastError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-[100vh] flex items-center justify-center p-4">
            <Toast ref={toastRef} />

            <div className="w-full max-w-[1280px] grid grid-cols-2">
                <div className="flex items-center justify-center">
                    <Image
                        src={'/logo-bankme.png'}
                        alt="Bankme"
                        className="max-w-[250px] h-auto"
                        width={913}
                        height={1080}
                    />
                </div>
                <form
                    className="w-full h-full flex flex-col items-start gap-4 p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-3xl font-bold">Login</h1>

                    <Input
                        label="Usuário"
                        name="login"
                        errors={errors}
                        control={control}
                        rules={{ required: "Usuário obrigatório" }}
                    />

                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        errors={errors}
                        control={control}
                        rules={{ required: "Senha obrigatória" }}
                    />

                    <Button
                        label="Entrar"
                        type="submit"
                        icon="pi pi-arrow-right"
                        iconPos="right"
                        loading={isLoading}
                    />
                </form>
            </div>
        </div>
    )
}

export default Home;