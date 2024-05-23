interface Props {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined
  onClick?: () => void;
  delete?: boolean;
  disabled?: boolean;
}

export default function Button(props: Props) {
  return (
    <button
      className={'w-full py-2 px-3 rounded-2xl font-bold duration-200 ease-out flex justify-center items-center gap-1 text-HeaderBgColor ' +
        (props.disabled ? 'bg-opacity-40' : 'hover:bg-opacity-80') +
        (props.delete ? ' bg-red-600' : ' bg-themeColor')
      }
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}