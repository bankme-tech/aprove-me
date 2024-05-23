import Link from "next/link";

type TableLine = {
  edit?: boolean;
};

export const TableLine = ({ edit, content, keys, link }: any) => {
  return (
    <tr className={edit ? "hover:bg-success  " : ""}>
      {keys
        ? keys.map((key: any) => (
            <td
              key={key}
              className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap"
            >
              {content[key]}
            </td>
          ))
        : content.map(({ key, value }: any) => (
            <td
              key={key}
              className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap"
            >
              {value}
            </td>
          ))}

      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap ">
        {edit && (
          <Link href={link + "?id=" + content.id}>
            <span className="text-primary-dark hover:underline">Edit</span>
          </Link>
        )}
      </td>
    </tr>
  );
};
