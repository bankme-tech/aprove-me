import Link from "next/link";

type TableLine = {
  edit?: boolean;
  content: any; // TODO: to fix
  keys?: string[];
  link?: string; // TODO: add type conditional
  showMore?: boolean;
  exclude?: boolean;
};

export const TableLine = ({
  edit,
  content,
  keys,
  link,
  showMore,
  exclude,
}: TableLine) => {
  return (
    <tr {...(edit && { className: "hover:bg-success" })}>
      {keys
        ? keys.map((key: any) => (
            <td
              key={`${key}-${content}`}
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
      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap space-x-4 ">
        {edit && (
          <Link href={link + "/edit?id=" + content.id}>
            <span className="text-primary-dark hover:underline hover:text-primary hover:font-bold">
              Editar
            </span>
          </Link>
        )}
        {showMore && (
          <Link href={link + "/show-more?id=" + content.id}>
            <span className="text-primary-dark hover:underline hover:text-primary hover:font-bold">
              Ver Mais
            </span>
          </Link>
        )}
        {exclude && (
          <Link href={link + "/delete?id=" + content.id}>
            <span className="text-primary-dark hover:underline hover:text-red-500 hover:font-bold">
              Excluir
            </span>
          </Link>
        )}
      </td>
    </tr>
  );
};
