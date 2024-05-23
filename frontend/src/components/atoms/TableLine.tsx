type TableLine = {
  edit?: boolean;
};

export const TableLine = ({ edit }: TableLine) => {
  return (
    <tr className={edit ? "hover:bg-success hover:opacity-80" : ""}>
      <td className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap ">
        Apple Imac 27
      </td>
      <td className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap ">
        Desktop PC
      </td>
      <td className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap ">
        $1999
      </td>

      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap ">
        {edit && (
          <a href="#" className="text-primary-dark hover:underline">
            Edit
          </a>
        )}
      </td>
    </tr>
  );
};
