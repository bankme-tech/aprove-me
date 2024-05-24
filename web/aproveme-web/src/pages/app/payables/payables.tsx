import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { PayableTableRow } from './components/payable-table-row'

export const Payables = () => {
  const payables = [
    {
      id: '1',
      value: 333.33,
      emissionDate: '2024-05-22T12:47:20.560Z',
      assignorId: '1',
    },
    {
      id: '2',
      value: 333.33,
      emissionDate: '2024-05-22T12:47:20.560Z',
      assignorId: '1',
    },
    {
      id: '3',
      value: 333.33,
      emissionDate: '2024-05-22T12:47:20.560Z',
      assignorId: '1',
    },
    {
      id: '4',
      value: 333.33,
      emissionDate: '2024-05-22T12:47:20.560Z',
      assignorId: '1',
    },
    {
      id: '5',
      value: 333.33,
      emissionDate: '2024-05-22T12:47:20.560Z',
      assignorId: '1',
    },
  ]
  return (
    <>
      <Helmet title="Recebíveis" />
      <h1 className="text-3xl font-bold tracking-tight">Recebíveis</h1>
      <main className="w-[900px] self-center">
        <section className="space-y-2.5">
          <Table>
            {/* <TableCaption>Uma lista de recebíveis</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[100px]">Identificador</TableHead>
                <TableHead className="w-[200px] text-center">
                  Data de emissão
                </TableHead>
                <TableHead>Cedente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payables.map((payable) => (
                <PayableTableRow key={payable.id} payable={payable} />
              ))}
            </TableBody>
          </Table>

          <Pagination
            onPageChange={() => {}}
            pageIndex={0}
            perPage={10}
            totalCount={50}
          />
        </section>
      </main>
    </>
  )
}
