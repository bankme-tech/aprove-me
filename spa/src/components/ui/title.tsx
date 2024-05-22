interface Props {
  children: React.ReactNode;
}

export default function Title(props: Props) {
  return (
    <h1 className="font-bold text-2xl sm:text-3xl text-textColor w-full">
      {props.children}
    </h1>
  )

}