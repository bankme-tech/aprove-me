'use client';

import { FormEvent, useRef, useState } from "react";
import Input from "../_components/Input";
import { Button } from "primereact/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "./_actions/auth";
import { Toast } from "primereact/toast";

const Home = () => {
    const toastRef = useRef<any>(null);

    const router = useRouter();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const showError = (message: string) => {
        toastRef.current.show({
            severity: 'error', summary: 'Error!', detail: message
        });
    }

    const signIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);

            const result = await auth(login, password);

            console.log(result)

            if (result?.error) {
                for (let i = 0; i < result.message.length; i++) {
                    showError(result.message[i]);
                }
                return;
            }

            if (!result?.access_token) {
                showError('Usuário não encontrado!');
                return;
            }

            localStorage.setItem("token", result.access_token);

            router.push('/assignors');
        } catch (e: any) {
            showError(e.message);
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
                    onSubmit={signIn}
                >
                    <h1 className="text-3xl font-bold">Login</h1>

                    <Input
                        label="Usuário"
                        onChange={e => setLogin(e.target.value)}
                        value={login}
                    />

                    <Input
                        type="password"
                        label="Senha"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
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