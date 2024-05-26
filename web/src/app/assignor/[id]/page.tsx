"use client";
'use components';

import Loading from "@/app/components/Loading";
import * as Styled from "@/app/styles";
import * as AssignorStyle from "@/app/styles/Details";
import { connection } from "@/connection";
import Assignor from "@/interfaces/Assignor";
import { getToken, removeToken } from "@/utils/tokenUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AssygnorDetailsProps = {
  params: {
    id: string;
  };
};

export default function AssignorDetails({ params }: AssygnorDetailsProps) {
  const [data, setData] = useState<Assignor | null>(null);
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
        const response = await connection.get<Assignor>(
          `/assignor/${params.id}`,
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
          <AssignorStyle.Card>
          <AssignorStyle.Title>{data?.name}</AssignorStyle.Title>
          <AssignorStyle.Paragraph><span>ID:</span> {data?.id}</AssignorStyle.Paragraph>
          <AssignorStyle.Paragraph><span>Email:</span> {data?.email}</AssignorStyle.Paragraph>
          <AssignorStyle.Paragraph><span>Phone:</span> {data?.phone}</AssignorStyle.Paragraph>
          <AssignorStyle.Paragraph><span>Document:</span> {data?.document}</AssignorStyle.Paragraph>
          <div style={{display: "flex"}}>
          <AssignorStyle.Button onClick={() => router.push(`/assignor/${data?.id}/edit`)}>
            Edit Assignor
          </AssignorStyle.Button>
          <AssignorStyle.Button onClick={() => router.back()}>
            Back
          </AssignorStyle.Button>
          </div>
          </AssignorStyle.Card>
        )}
      </Styled.Container>
    </Styled.Main>
  );
}
