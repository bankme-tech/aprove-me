import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetAssignorByIdApi } from '../../service/assignorsApi';
import { TAssignors } from '../../types/AssignorsType';
import { TablePayables } from '../payables/style';

export const AssignorsDetails = () => {
  const getParams = useParams() as { id: string };
  const [assignorsDetails, setAssignorsDetails] = useState<TAssignors>({
    id: '',
    name: '',
    document: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    GetAssignorDetails()
  })

  const GetAssignorDetails = async () => {
    const response = await GetAssignorByIdApi(getParams.id);
    setAssignorsDetails(response);
  }
  return (
    <TablePayables>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Documento</th>
          <th>Email</th>
          <th>Telefone</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{assignorsDetails.id}</td>
          <td>{assignorsDetails.name}</td>
          <td>{assignorsDetails.document}</td>
          <td>{assignorsDetails.email}</td>
          <td>{assignorsDetails.phone}</td>
        </tr>
      </tbody>
    </TablePayables>
  );
}