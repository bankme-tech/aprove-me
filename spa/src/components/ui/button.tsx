interface Props {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined
  onClick?: () => void;
}

export default function Button(props: Props) {
  return (
    <button
    className={'w-full py-2 px-3 rounded-2xl font-bold text-text hover:bg-opacity-90 duration-200 ease-out flex justify-center items-center gap-1 bg-themeColor text-HeaderBgColor'}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}