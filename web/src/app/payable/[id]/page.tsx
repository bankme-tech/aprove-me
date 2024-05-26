"use client";
'use components';

import Loading from "@/app/components/Loading";
import * as Styled from "@/app/styles";
import * as PayableStyle from "@/app/styles/Details";
import { connection } from "@/connection";
import Payable from "@/interfaces/Payable";
import { getToken, removeToken } from "@/utils/tokenUtils";
import transformDate from "@/utils/transformDate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PàyableDetailsProps = {
  params: {
    id: string;
  };
};

export default function PayableDetails({ params }: PàyableDetailsProps) {
  const [data, setData] = useState<Payable | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await connection.get<Payable>(
          `/payable/${params.id}`,
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);      
      setLoading(false);
    } catch (error: any) {
      if (error.response.status === 401) {
        removeToken();
        router.push("/login");
        return
      } else {
        setError(error.response.data.message);
    }
  }}
    fetchData();
  }, [params.id, router]);

  if (error) {
    return (
      <Styled.Main>
        <Styled.Container>
          <h1>Error</h1>
          <p>{error}</p>
        </Styled.Container>
      </Styled.Main>
    );
  }

  return (
    <Styled.Main>
      <Styled.Container>
        {loading ? (
          <Loading />
        ) : (
          <PayableStyle.Card>
          <PayableStyle.Paragraph><span>ID:</span> {data?.id}</PayableStyle.Paragraph>
          <PayableStyle.Paragraph><span>Value:</span> {data?.value}</PayableStyle.Paragraph>
          <PayableStyle.Paragraph><span>Emission Date:</span> {transformDate(data?.emissionDate)}</PayableStyle.Paragraph>
          <PayableStyle.Paragraph>
            <span>Assignor:</span> {data?.assignorId}
          </PayableStyle.Paragraph>
          <div style={{display: "flex"}}>
          <PayableStyle.Button onClick={() => router.push(`/payable/${data?.id}/edit`)}>
            Edit Payable
          </PayableStyle.Button>
          <PayableStyle.Button onClick={() => router.back()}>
            Back
          </PayableStyle.Button>
          </div>
          </PayableStyle.Card>
        )}
      </Styled.Container>
    </Styled.Main>
  );
}
