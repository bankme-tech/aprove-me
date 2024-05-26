import { useParams } from "react-router-dom";
import { axiosInstance as axios } from "../../api";
import { useEffect, useState } from "react";
import { Assignor, Payable } from "../../types";
import { convertDate, getTokenAndSetHeaders } from "../../helpers";

function PayableDetails() {
  const [payable, setPayable] = useState<Payable>();
  const [assignor, setAssignor] = useState<Assignor>()
  const { id } = useParams();

  const date = payable && convertDate(payable.emissionDate);
  
  useEffect(() => {
    const config = getTokenAndSetHeaders();
    const getDetails = async () => {
      try {
        const { data } = await axios.get(`/payable/${id}`, config);
        setPayable(data);
      } catch (err) {
        console.log(err);
        alert('Recebível não encontrado.')
      }
    };
    getDetails();

    if (payable) {
      const getAssignor = async () => {
        try {
          const { data } = await axios.get(`/assignor/${payable.assignorId}`, config);
          setAssignor(data);
        } catch (err) {
          console.log(err);
        }
      };
      getAssignor();
    }
  }, [id, payable]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <main>
      <h1>Detalhes do Recebível</h1>
      <p>{`Valor: R$ ${ payable?.value }`}</p>
      <p>{`Data de emissão: ${ date }`}</p>
      <p>{`Cedente: ${assignor?.name}`}</p>
      <button onClick={ handleEdit }>Editar</button>
      <button onClick={ handleDelete }>Excluir</button>
    </main>
  )
}

export default PayableDetails;