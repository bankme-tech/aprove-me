import axios from "axios";

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
    console.log(payable);
    const request = await axios.post('http://localhost:3000/integrations/payable', 
    { value: parseFloat(payable.value), emissionDate: payable.emissionDate, assignorId: Number(payable.assignorId) }, 
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
          acc[key] = Number(payable[key]);
        } else {
          acc[key] = payable[key];
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