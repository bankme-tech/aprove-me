'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { withAuth } from '@/lib/with-auth';
import { useAuth } from '@/hooks/use-auth';
import {
  FetchPayableListStatus,
  useFetchPayableList,
} from '@/services/fetch-payable-list';
import { formatMoney } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

function Page() {
  const { username } = useAuth();
  const { data, status } = useFetchPayableList();

  const isLoading = status === FetchPayableListStatus.LOADING;

  return (
    <main className="p-5">
      <div className="w-full p-6 border shadow-sm border-gray-200 rounded-md bg-white">
        <div className="flex justify-between gap-10">
          <div className="w-full">
            <h2 className="font-bold text-xl">Olá {username}!</h2>
            <span className="text-gray-500">
              Essa é a listagem de todos os recebíveis
            </span>
          </div>
        </div>
        <div className="border-gray-200 rounded-md border mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data de emissão</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from(new Array(10)).map((v) => (
                  <TableRow key={v}>
                    <TableCell>
                      <Skeleton key={v} className="h-[20px] w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton key={v} className="h-[20px] w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton key={v} className="h-[20px] w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton key={v} className="h-[20px] w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading &&
                data.map((payable) => (
                  <TableRow key={payable.id}>
                    <TableCell>{payable.id}</TableCell>
                    <TableCell>{formatMoney(payable.value)}</TableCell>
                    <TableCell>
                      {payable.emissionDate.toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default withAuth(Page);
