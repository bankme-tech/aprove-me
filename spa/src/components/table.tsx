import { ReactNode } from "react";
import { PayableType } from "../types";
import { UUID } from "crypto";

interface Props {
  payables: PayableType[]
  handleOpenPayable: (id: UUID) => void
}


export default function Table(props: Props) {

  return (
    <table className="table-fixed md:table-auto w-full max-w-2xl">
      <thead>
        <tr className="text-base font-semibold text-left tracking-wide text-gray-950">
          <th className="px-3 py-2 rounded-l-xl bg-slate-400 bg-opacity-20">Id:</th>
          <th className="px-3 py-2 bg-slate-400 bg-opacity-20">Valor:</th>
          <th className="px-3 py-2 rounded-r-xl bg-slate-400 bg-opacity-20">Data de emissão:</th>
        </tr>
      </thead>

      <tbody>
        {props.payables.map((payable) => (
          <tr
            onClick={() => props.handleOpenPayable(payable.id as UUID)}
            key={payable.id}
            className="border-separate rounded-3xl border-b border-borderColor w-full text-sm group cursor-pointer"
          >
            <td className="px-3 py-3 text-opacity-10 rounded-l-xl
                group-hover:bg-themeColor 
                  group-hover:bg-opacity-40
                  group-hover:text-themeColor
                 ">
              {payable.id}
            </td>

            <td className="px-3 py-3 font-medium
                group-hover:bg-themeColor 
                group-hover:bg-opacity-40
                group-hover:text-themeColor
                ">
              R$ {payable.value.toFixed(2)}
            </td>

            <td className="px-3 py-3 rounded-r-xl
                group-hover:bg-themeColor 
                group-hover:bg-opacity-40
                group-hover:text-themeColor
                ">
              {new Date(payable.emissionDate).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}