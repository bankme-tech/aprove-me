import { TableLine } from "../atoms/TableLine";

export const TableBody = ({ content, keys }: any) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {content.map((row: any, idx: number) => {
        return (
          <TableLine key={row.key} content={row} keys={keys} edit idx={idx} />
        );
      })}
    </tbody>
  );
};
