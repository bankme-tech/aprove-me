"use client";

import { useQuery } from "@tanstack/react-query";
import { usePayable } from "@/context/payable/use-payable";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/auth/use-auth";
import withAuth from "@/components/with-auth";

const Home = () => {
  const { isAuth } = useAuth();
  const { getAllPayables } = usePayable();
  const { status, data } = useQuery({
    queryKey: ["payables"],
    queryFn: getAllPayables,
    enabled: isAuth,
  });

  if (status === "pending") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Carregando...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Erro</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md m-3 bg-white rounded shadow-md ">
        <div className="flex justify-center gap-3 m-5">
          <Link
            href={"/payables"}
            className={buttonVariants({
              variant: "outline",
              className: "w-fit opacity-75 hover:bg-blue-600 hover:text-white",
            })}
          >
            Criar recebível
          </Link>
          <Link
            href={"/assignors"}
            className={buttonVariants({
              variant: "outline",
              className: "w-fit opacity-75 hover:bg-blue-600 hover:text-white",
            })}
          >
            Criar cedente
          </Link>
        </div>
        <h1 className="mb-4 text-xl font-bold text-center sm:text-2xl">
          Listagem de recebíveis
        </h1>
        <div className="overflow-x-auto">
          <Table className="w-auto min-w-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto sm:w-auto">ID</TableHead>
                <TableHead>Data de emissão</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((payable) => (
                  <TableRow key={payable.id}>
                    <TableCell className="font-medium">
                      <Link
                        className="font-extrabold text-bankmeBlue hover:underline"
                        href={`/payables/${payable.id}`}
                      >
                        {payable.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(payable.emissionDate).toLocaleDateString(
                        "pt-BR"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {payable.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Nenhum recebível encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Home);
