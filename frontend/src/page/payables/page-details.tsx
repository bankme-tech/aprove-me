import { useEffect, useState } from 'react';
import { TPayable } from '../../types/PayableType';
import { GetPayableByIdApi } from '../../service/PayableApi';
import { PayablesDetailsContainer } from './style';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailsPayables = () => {
  const navigate = useNavigate();
  const [payables, setPayables] = useState<TPayable>({
    id: '',
    value: 0,
    emissionDate: '',
    assignor: ''
  });
  const [showAssignorsDetails, setShowAssignorsDetails] = useState(false);

  const getParams = useParams() as { id: string };

  useEffect(() => {
    getDetails();
  },[])

  const getDetails = async () => {
    try {
      const response = await GetPayableByIdApi(getParams.id);
      setPayables(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PayablesDetailsContainer>
      <h1>Detalhes do pagável</h1>
      <h2>ID:</h2>
      <p>{payables.id}</p>
      <h2>Valor</h2>
      <p>{payables.value}</p>
      <h2>Data de emissão</h2>
      <p>{payables.emissionDate}</p>
      <h2>Cedente</h2>
      <p>{payables.assignor}</p>

      <button
        onClick={ () => {
          setShowAssignorsDetails(!showAssignorsDetails);
          navigate(`/assignors/${payables.assignor}`);
        }}
      >
        Ver cedente
      </button>
    </PayablesDetailsContainer>
  )
}