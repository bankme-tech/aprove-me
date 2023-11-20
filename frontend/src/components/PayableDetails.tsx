import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAYABLE_URL='recebiveis-backend:3001/integrations/payable';

interface PayableDetailsProps {
  match: {
    params: {
      id: string;
    };
  };
}

const PayableDetails: React.FC<PayableDetailsProps> = ({ match }) => {
  const [payable, setPayable] = useState<any>(null);

  useEffect(() => {
    const fetchPayableDetails = async () => {
      try {
        const response = await axios.get(`${PAYABLE_URL}/${match.params.id}`);
        setPayable(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes do pagável:', error);
      }
    };

    fetchPayableDetails();
  }, [match.params.id]);

  if (!payable) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Detalhes do Pagável</h2>
      <p>ID: {payable.id}</p>
      <p>Valor: {payable.value}</p>
      <p>Data de Emissão: {new Date(payable.emissionDate).toLocaleDateString()}</p>
      <p>Cedente: {payable.assignor.name}</p>
    </div>
  );
};

export default PayableDetails;
