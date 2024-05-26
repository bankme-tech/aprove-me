import { useEffect, useState } from "react";
import { Assignor } from "../../types";
import { axiosInstance as axios } from "../../api";
import { useParams } from "react-router-dom";
import { getTokenAndSetHeaders } from "../../helpers";

function AssignorDetails() {
  const [assignor, setAssignor] = useState<Assignor>()
  const { id } = useParams();
  const config = getTokenAndSetHeaders();
  
  useEffect(() => {
    const getAssignor = async () => {
      try {
        const { data } = await axios.get(`/assignor/${id}`, config);
        setAssignor(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAssignor();
  }, [config, id]);
  
  return (
    <main>
      <h1>Detalhes do Cedente</h1>
      <p>{`Nome: ${assignor?.name}`}</p>
      <p>{`Documento: ${assignor?.document}`}</p>
      <p>{`Email: ${assignor?.email}`}</p>
      <p>{`Telefone: ${assignor?.phone}`}</p>
    </main>
  )
}

export default AssignorDetails;