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
    { data: payable }, 
    {
      headers: {
        Authorization: token.token // Adicione Bearer se estiver usando tokens JWT
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