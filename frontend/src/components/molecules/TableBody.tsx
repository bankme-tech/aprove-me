import { Suspense } from "react";
import { TableLine } from "../atoms/TableLine";

export const TableBody = ({ content, keys, link }: any) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <Suspense fallback={<p>Loading...</p>}>
        {content.map((row: any) => {
          return (
            <TableLine
              key={row.key}
              content={row}
              keys={keys}
              link={link}
              edit
            />
          );
        })}
      </Suspense>
    </tbody>
  );
};
