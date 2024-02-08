'use client';

import { FormEvent, useState } from "react";
import Input from "../_components/Input";
import { Button } from "primereact/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {

    const router = useRouter();

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

        router.push('/assignors');

        setIsLoading(false);
    }

    return (
        <div className="w-full h-[100vh] flex items-center justify-center p-4">
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
                        onChange={e => setUsuario(e.target.value)}
                        value={usuario}
                    />

                    <Input
                        type="password"
                        label="Senha"
                        onChange={e => setSenha(e.target.value)}
                        value={senha}
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