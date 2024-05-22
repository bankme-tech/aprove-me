import axios from "axios";

export async function getAssignors(token: any) {
  try {
    const request = await axios.get('http://localhost:3000/integrations/assignor', {
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