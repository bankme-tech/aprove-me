import axios from "axios";
import { convertToISO8601 } from "./date";

export async function getPayables(token: any) {
  try {
    const request = await axios.get('http://localhost:3000/integrations/payable', {
      headers: {
        Authorization: token.token
      }
    });

    return request;
  } catch(e: any) {
    const status = e.response ? e.response.data.statusCode : 'Network Error';
    const message = e.response ? e.response.data.message : e.message;

    return { status, message, data: '' };
  }
}

export async function addPayables(token: any, payable: any) {
  try {
    const formattedDate = convertToISO8601(payable.emissionDate)
    const request = await axios.post('http://localhost:3000/integrations/payable', 
    { value: parseFloat(payable.value), emissionDate: formattedDate, assignorId: Number(payable.assignorId) }, 
    {
      headers: {
        Authorization: token.token
      }
    }
  );

    return request;
  } catch(e: any) {
    const status = e.response ? e.response.data.statusCode : 'Network Error';
    const message = e.response ? e.response.data.message : e.message;

    return { status, message, data: '' };
  }
}

export async function editPayables(token: any, payable: any, id: any) {
  try {
    const filteredPayable = Object.keys(payable).reduce((acc, key) => {
      if (key !== 'id' && payable[key] !== '') {
        if (key === 'assignorId' || key === 'value') {
          console.log('entrou no if');
          acc[key] = Number(payable[key]);
        } 
        if (key === 'emissionDate') {
            console.log('entrou no if 2');
            acc[key] = convertToISO8601(payable[key]);
        }
      }
      return acc;
    }, {} as Record<string, any>);

    console.log('Filtered Payable:', filteredPayable);
    const request = await axios.put(`http://localhost:3000/integrations/payable/${payable.id}`, 
    filteredPayable, 
    {
      headers: {
        Authorization: token.token
      }
    }
  );

    return request;
  } catch(e: any) {
    const status = e.response ? e.response.data.statusCode : 'Network Error';
    const message = e.response ? e.response.data.message : e.message;

    return { status, message, data: '' };
  }
}

export async function removePayables(token: any, id: string) {
  try {
    const request = await axios.delete(`http://localhost:3000/integrations/payable/${id}`, {
      headers: {
        Authorization: token.token
      }
    });

    return request;
  } catch(e: any) {
    const status = e.response ? e.response.data.statusCode : 'Network Error';
    const message = e.response ? e.response.data.message : e.message;

    return { status, message, data: '' };
  }
}