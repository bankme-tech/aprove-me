'use client';

import { useContext, useRef, useState } from "react";
import Input from "../components/Input";
import { Button } from "primereact/button";
import Image from "next/image";
import { Toast } from "primereact/toast";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "./actions";

const Home = () => {
  const toastRef = useRef<any>(null);

  const { control, handleSubmit, formState: { errors } } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const showToast = (severity: string, summary: string, detail: string) => {
    toastRef.current.show({severity, summary, detail});
  }

  const onSubmit = async ({login, password}: FieldValues) => {
    try {
      setIsLoading(true);

      const result = await signIn({login, password});

      console.log(result);

    } catch (e: any) {
      showToast('error', 'Erro!', e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-[100svh] bg-[--primary] relative">
      <Toast ref={toastRef} />

      <Image
        src={'/bank-people.jpg'}
        alt="bank"
        width={1020}
        height={680}
        className="hidden lg:block absolute w-full h-full object-cover object-right opacity-50"
      />

      <div className="absolute w-full h-full lg:grid lg:grid-cols-2">
        <form
          className="w-full h-full bg-white p-8 pt-20 lg:p-20 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center">
            <Image src={"/logo-bankme-fullname.webp"} alt="bankme" width={160} height={90} />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-3xl lg:text-2xl">Bem vindo, <span className="text-[--primary]">Bankmer</span>!</h1>
            <h2 className="text-xl font-bold text-gray-700 lg:text-lg">Tudo o que você precisa em uma única solução</h2>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Usuário"
              name="login"
              control={control}
              errors={errors}
              rules={{ required: "Usuário obrigatório" }}
            />

            <Input
              label="Senha"
              name="password"
              control={control}
              errors={errors}
              rules={{ required: "Usuário obrigatório" }}
              type="password"
            />
          </div>

          <Button
            className="w-full text-[22px] lg:text-lg"
            label="Entrar"
            loading={isLoading}
          />
        </form>

        <div className="hidden w-full h-full text-white p-10 pt-20 lg:flex lg:flex-col lg:justify-between">
          <h1 className="text-5xl font-semibold">Oferte crédito do jeito certo</h1>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full p-2">
              <Image
                src={"/logo-bankme.png"}
                alt="bankme"
                width={913}
                height={1080}
                className="w-full h-full object-contain"
              />
            </div>

            <Link className="p-button-link text-white hover:underline" href="https://bankme.tech">
              bankme.tech
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;