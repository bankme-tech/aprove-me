import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { fetchPayables } from '@/api/fetch-payables'
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
  const [searchParams, setSeatchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['payables', page],
    queryFn: () => fetchPayables({ page }),
  })

  const handlePaginate = (page: number) => {
    setSeatchParams((prevState) => {
      prevState.set('page', String(page))

      return prevState
    })
  }

  return (
    <>
      <Helmet title="Recebíveis" />
      <h1 className="text-3xl font-bold tracking-tight">Recebíveis</h1>
      <main className="-mt-3 w-8/12 self-center">
        <section className="space-y-2.5">
          <Table>
            {/* <TableCaption>Uma lista de recebíveis</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[270px] text-center">
                  Identificador
                </TableHead>
                <TableHead className="w-[200px] text-center">
                  Data de emissão
                </TableHead>
                <TableHead className="pr-8 text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {result?.payables.map((payable) => {
                return <PayableTableRow key={payable.id} payable={payable} />
              })}
            </TableBody>
          </Table>

          {result && (
            <Pagination
              onPageChange={handlePaginate}
              page={page}
              perPage={5}
              totalCount={result.totalCount}
            />
          )}
        </section>
      </main>
    </>
  )
}
