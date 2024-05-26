import { convertDate } from "../helpers";
import { Payable } from "../types";

function PayableCard({id, value, emissionDate}: Payable) {
  const date = convertDate(emissionDate);
  return (
    <tr>
      <td>{id}</td>
      <td>{`R$ ${value}`}</td>
      <td>{date}</td>
      <td>
        <button>Editar</button>
      </td>
      <td>
        <button>Excluir</button>
      </td>
    </tr>
  )
}

export default PayableCard;