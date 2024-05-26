import { useNavigate } from "react-router-dom";
import { convertDate } from "../helpers";
import { Payable } from "../types";

function PayableCard({id, value, emissionDate}: Payable) {
  const date = convertDate(emissionDate);
  const navigate = useNavigate();
  const handleSeeDetails = () => {
    navigate(`/integrations/payable/${id}`)
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{`R$ ${value}`}</td>
      <td>{date}</td>
      <td>
        <button onClick={ handleSeeDetails }>Ver detalhes</button>
      </td>
    </tr>
  )
}

export default PayableCard;