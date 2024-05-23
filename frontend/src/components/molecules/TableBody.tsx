import { TableLine } from "../atoms/TableLine";

export const TableBody = () => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <TableLine edit />
    </tbody>
  );
};
