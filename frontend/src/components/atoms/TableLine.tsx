type TableLine = {
  edit?: boolean;
};

export const TableLine = ({ edit, content, keys, idx }: any) => {
  console.log("🚀 ~ TableLine ~ keys:", keys, idx);
  return (
    <tr className={edit ? "hover:bg-success  " : ""}>
      {keys
        ? keys.map((key: any) => (
            <td
              key={key}
              className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap"
            >
              {console.log("🚀 ~ TableLine ~ content[idx]:", content)}
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
          <a href="#" className="text-primary-dark hover:underline">
            Edit
          </a>
        )}
      </td>
    </tr>
  );
};
