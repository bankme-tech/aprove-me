import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TakeSelect } from "./components/takeSelect";
import { usePayableStore } from "@/stores/usePayableStore";

interface TablePaginationProps {
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  totalPages: number;
}

export const TablePagination = (props: TablePaginationProps) => {
  const payable = usePayableStore();

  return (
    <Pagination className="flex items-center justify-between w-full py-2">
      {props.currentPage} de {props.totalPages}
      <PaginationContent>
        <TakeSelect value={payable.take} setValue={payable.handleTake} />

        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            onClick={props.prevPage}
            disabled={props.currentPage <= 1}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            onClick={props.nextPage}
            disabled={props.currentPage === props.totalPages}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
