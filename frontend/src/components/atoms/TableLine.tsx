import Link from "next/link";

type TableLine = {
  edit?: boolean;
  content: any; // TODO: to fix
  keys?: string[];
  link?: string; // TODO: add type conditional
};

export const TableLine = ({ edit, content, keys, link }: TableLine) => {
  return (
    <tr {...(edit && { className: "hover:bg-success" })}>
      {keys
        ? keys.map((key: any) => (
            <td
              key={key}
              className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap"
            >
              {content[key]}
            </td>
          ))
        : content.map(({ id, value }: any) => (
            <td
              key={id}
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
