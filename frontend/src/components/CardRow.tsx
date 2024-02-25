type Props = {
  label: string;
  data: string | number;
}

function CardRow({ label, data }: Props) {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">{label}</h3>
      <p>{data}</p>
    </div>
  )
}


export default CardRow
