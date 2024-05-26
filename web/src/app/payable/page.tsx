"use client";

import { useEffect, useState } from "react";
import * as Styled from "../styles";
import * as PayableStyle from '../styles/Details';
import Assignor from "@/interfaces/Assignor";
import Payable from "@/interfaces/Payable";
import { connection } from "@/connection";
import useAuthentication from "@/hooks/useAuthentication";
import Loading from "../components/Loading";
import { getToken } from "@/utils/tokenUtils";
import transformDate from "@/utils/transformDate";
import TablePayable from "../components/TablePayable";
import { useRouter } from "next/navigation";

export default function PayablePage() {
  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [payable, setPayable] = useState<Payable[]>([]);
  useAuthentication();
  const router = useRouter();
  
  useEffect(() => {
    async function data() {
      const token = getToken();
      const assignorsResponse = await connection.get<Assignor[]>("/assignor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payableResponse = await connection.get<Payable[]>("/payable", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignors(assignorsResponse.data);
      setPayable(payableResponse.data);
      setLoading(false);
    }
    data();
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  return (
    <Styled.Main>
      <Styled.Container>
        <PayableStyle.Title>Payables</PayableStyle.Title>
        <PayableStyle.Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Value</th>
              <th>Emission Date</th>
              <th>Assignor</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {payable.map((payable) => {
              const assignor = assignors.find((assignor) => assignor.id === payable.assignorId) as Assignor;
              return (<TablePayable key={payable.id} payable={payable} assignor={assignor} />)
            })}
          </tbody>
        </PayableStyle.Table>
        <PayableStyle.Button onClick={() => router.push('/')}
          style={{backgroundColor: "#0b36c0"}}
        >
            Home
          </PayableStyle.Button>
      </Styled.Container>
    </Styled.Main>
  );
}
