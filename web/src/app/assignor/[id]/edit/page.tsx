"use client";
"use components";

import Loading from "@/app/components/Loading";
import * as Styled from "@/app/styles";
import * as AssignorStyle from "@/app/styles/Details";
import { connection } from "@/connection";
import Assignor from "@/interfaces/Assignor";
import { getToken, removeToken } from "@/utils/tokenUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AssygnorDetailsProps = {
  params: {
    id: string;
  };
};

export default function AssignorEdit({ params }: AssygnorDetailsProps) {
  const [updatedData, setUpdatedData] = useState<Partial<Assignor>>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        await connection.get<Assignor>(`/assignor/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
          router.push("/login");
          return;
        } else {
          setError(error.response.data.message);
        }
      }
    }
    fetchData();
  }, [params.id, router]);

  const handleChangeNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (/^\d*$/.test(value)) {
      setUpdatedData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = async () => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await connection.patch(
        `/assignor/${params.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(`/assignor/${params.id}`);
    } catch (error: any) {
      if (error.response.status === 401) {
        removeToken();
        router.push("/login");
        return;
      } else {
        setError(error.response.data.message);
      }
    }
  };

  if (error) {
    return (
      <Styled.Main>
        <Styled.Container>
          <h1>Error</h1>
          <p>{error}</p>
          <Link href={`/assignor/${params.id}`}>Back</Link>
        </Styled.Container>
      </Styled.Main>
    );
  }

  return (
    <Styled.Main>
      <Styled.Container>
        <AssignorStyle.Card>
          <Styled.Input name="name" type="text" placeholder="Name" 
            value={updatedData.name}
            onChange={(e) => setUpdatedData((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Styled.Input name="email" type="email" placeholder="Email" 
            value={updatedData.email}
            onChange={(e) => setUpdatedData((prev) => ({ ...prev, email: e.target.value }))}
          />
          <Styled.Input
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={handleChangeNumbers}
            value={updatedData.phone}
          />
          <Styled.Input name="document" type="text" placeholder="Document" 
            onChange={handleChangeNumbers}
            value={updatedData.document}
          />
          <AssignorStyle.Button onClick={handleEdit}>
            Confirm
          </AssignorStyle.Button>
        </AssignorStyle.Card>
      </Styled.Container>
    </Styled.Main>
  );
}
