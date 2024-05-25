import { TableLine } from "../atoms/TableLine";

export const TableBody = ({ content, keys, link }: any) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {content.map((row: any) => {
        return (
          <TableLine key={row.key} content={row} keys={keys} link={link} edit />
        );
      })}
    </tbody>
  );
};
