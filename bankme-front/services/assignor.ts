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

export async function addAssignor(token: any, assignor: any) {
  try {
    const request = await axios.post('http://localhost:3000/integrations/assignor', 
    assignor, 
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

export async function editAssignor(token: any, assignor: any, id: any) {
  try {
    const filteredAssignor = Object.keys(assignor).reduce((acc, key) => {
      if (key !== 'id' && assignor[key] !== '') {
        acc[key] = assignor[key];
      }
      return acc;
    }, {} as Record<string, any>);

    console.log(filteredAssignor);

    const request = await axios.put(`http://localhost:3000/integrations/assignor/${assignor.id}`, 
    filteredAssignor, 
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