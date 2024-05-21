import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <nav className="sm:flex flex sm:flex-row w-full flex-col justify-between items-center shadow-sm px-8 sm:mb-0 mb-10 text-white bg-white h-[100px]">
        <div className="flex items-center">
          <img
            src="/logo-bankme.png"
            alt="Logo"
            className="h-16 w-auto cursor-pointer mb-5"
          />
        </div>

        <div className="sm:flex items-center space-x-4">
          <button
            className="px-4 py-1 bg-[#0a36b0] text-[#fff] font-semibold rounded"
            data-testid="button-onboarding"
          >
            <Link href="/login">Fazer Login</Link>
          </button>
        </div>
      </nav>
      <div className="flex sm:justify-between flex-col sm:flex-row text-center sm:text-start pt-5 items-center sm:pr-4 sm:pl-8 px-5 w-full">
        <div className="sm:w-[50%] sm:mt-0 justify-start">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-[40px] font-bold">
              Tecnologia, suporte operacional e contábil para quem deseja ganhar
              dinheiro ofertando crédito
            </p>
            <p className="text-[16px] mt-5">
              Para além de absorver toda a complexibilidade da estruturação de
              Empresas de Crédito, somos responsáveis por todas as demandas da
              jornada de nossos clientes, entregando rentabilidade e segurança
              em suas operações.
            </p>
            <div className="mt-5">
              <Link href="/register-payable">
                <Button className="flex gap-2 bg-[#0a36b0]">
                  Cadastrar Pagável
                  <ArrowBigRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-[50%] justify-end bg-cover bg-center flex">
          <img
            src="/img-banner.png"
            alt="onboardingImage"
            className="sm:flex hidden h-[500px] w-auto object-contain justify-end"
          />
        </div>
      </div>
    </main>
  );
}
