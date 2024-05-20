
interface Props {
  children: React.ReactNode;
}

export default function FormCard(props: Props) {

  return (
    <div className="bg-gradient-to-b from-cardBgColorFrom to-cardBgColorto py-6 px-10 flex flex-col items-center gap-6 rounded-2xl border border-borderColor">
      {props.children}
    </div>
  )
}