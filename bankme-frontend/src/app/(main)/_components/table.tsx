import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';

// COMPONENTS
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

const DataTable = <Data extends object>({
    data,
    columns,
}: DataTableProps<Data>) => {
    const [filtering, setFiltering] = useState(``);
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        initialState: {
            columnVisibility: {
                id: false,
                assignorId: false,
            },
        },
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div>
            <input
                type="text"
                placeholder="Global filter"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                className="w-full border-b-2"
            />
            <Table>
                <TableCaption>Payable List</TableCaption>

                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}

                                        {header.column.getIsSorted() ? (
                                            header.column.getIsSorted() ===
                                            'desc' ? (
                                                <ArrowDown aria-label="sorted descending" />
                                            ) : (
                                                <ArrowUp aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export { DataTable };
