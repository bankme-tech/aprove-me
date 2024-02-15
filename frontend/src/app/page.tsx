'use client';

import { useRef, useState } from "react";
import Input from "../components/Input";
import { Button } from "primereact/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { FieldValues, useForm } from "react-hook-form";
import { BASE_URL } from "@/contants";
import Link from "next/link";

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

      const res = await fetch(`${BASE_URL}/integrations/auth`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
          login: data.login,
          password: data.password
        })
      });

      const result = await res.json();

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