import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

export interface PaginationProps {
  page: number
  totalCount: number
  perPage: number
  onPageChange: (page: number) => Promise<void> | void
}

export const Pagination = ({
  page,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium ">
          Página {page} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">primeira pagina</span>
          </Button>

          <Button
            onClick={() => onPageChange(page - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">pagina anterior</span>
          </Button>

          <Button
            onClick={() => onPageChange(page + 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pages <= page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">proxima pagina</span>
          </Button>

          <Button
            onClick={() => onPageChange(pages)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pages <= page}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">ultima pagina</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
