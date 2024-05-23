
interface Props {
  children: React.ReactNode;
}

export default function ConfirmModal(props: Props) {
  return (
    <div className="absolute w-screen h-screen right-0 top-0 flex justify-center items-center">
      {props.children}
    </div>
  )
}