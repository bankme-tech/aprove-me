import { TableLine } from "../atoms/TableLine";

export const TableHeader = ({ content }: any) => {
  return (
    <thead className="bg-gray-200">
      <TableLine content={content} />
    </thead>
  );
};
