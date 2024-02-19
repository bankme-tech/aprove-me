import { Skeleton, TableCell, TableRow } from './ui';

export const ReceivableTableSkeleton = () => {
  return (
    <>
      <TableRow>
        <TableCell>
          <Skeleton className="h-[20px] w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-full" />
        </TableCell>
      </TableRow>
    </>
  );
};
