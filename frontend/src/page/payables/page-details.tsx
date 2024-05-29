import { useEffect, useState } from 'react';
import { TPayable } from '../../types/PayableType';
import { GetPayableByIdApi } from '../../service/PayableApi';
import { PayablesDetailsContainer, TablePayables } from './style';
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
      <TablePayables>
      <thead>
        <tr>
          <th>ID</th>
          <th>Valor</th>
          <th>Data de emissão</th>
          <th>Cedente</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{payables.id}</td>
          <td>{payables.value}</td>
          <td>{payables.emissionDate}</td>
          <td>{payables.assignor}</td>
        </tr>
      </tbody>
     </TablePayables>

      <button
        onClick={ () => {
          setShowAssignorsDetails(!showAssignorsDetails);
          navigate(`/assignors/${payables.assignor}`);
        }}
      >
        Detalhes do cedente
      </button>
    </PayablesDetailsContainer>
  )
}