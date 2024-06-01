import { Suspense } from "react";
import { TableLine } from "../atoms/TableLine";

export const TableBody = ({ content, keys, link }: any) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <Suspense fallback={<p>Loading...</p>}>
        {content.length > 0
          ? content.map((row: any) => {
              return (
                <TableLine
                  key={row.id}
                  content={row}
                  keys={keys}
                  link={link}
                  edit
                  showMore
                  exclude
                />
              );
            })
          : null}
      </Suspense>
    </tbody>
  );
};
