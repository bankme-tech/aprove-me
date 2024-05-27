"use client";
"use components";

import * as Styled from "@/app/styles";
import * as PayableStyle from "@/app/styles/Details";
import { connection } from "@/connection";
import Assignor from "@/interfaces/Assignor";
import Payable from "@/interfaces/Payable";
import { getToken, removeToken } from "@/utils/tokenUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PayableDetailsProps = {
  params: {
    id: string;
  };
};

export default function AssignorEdit({ params }: PayableDetailsProps) {
  const [updatedData, setUpdatedData] = useState<Partial<Payable>>({});
  const [assignors, setAssignors] = useState<Assignor[]>([]);
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
        const result = await connection.get<Assignor[]>(`/assignor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssignors(result.data);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    if (!updatedData.value && !updatedData.assignorId) {
      setError("Please fill in at least one field");
      return;
    }
    let value;
    if (updatedData.value) {
      value = +updatedData.value;
      updatedData.value = value;
      if (isNaN(value) || value <= 0) {
        setError("Insert a 'value' correct");
        return;
      }
    }
    try {
      await connection.patch(`/payable/${params.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push(`/payable/${params.id}`);
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
          <Link href={`/payable/${params.id}`}>Back</Link>
        </Styled.Container>
      </Styled.Main>
    );
  }

  return (
    <Styled.Main>
      <Styled.Container>
        <PayableStyle.Card>
          <Styled.Input name="value" type="text" placeholder="Value" />
          <Styled.Select
            name="assignorId"
            onChange={handleChange}
            >
            <option value="selectAssignor">Select an Assignor</option>
            {assignors.map((assignor) => (
              <option key={assignor.id} value={assignor.id}>
                {assignor.name}
              </option>
            ))}
          </Styled.Select>
          <PayableStyle.Button onClick={handleEdit}>
            Confirm
          </PayableStyle.Button>
        </PayableStyle.Card>
      </Styled.Container>
    </Styled.Main>
  );
}
