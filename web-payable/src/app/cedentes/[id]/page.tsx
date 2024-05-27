"use client";

import { useParams } from "next/navigation";
import EditAssignorForm from "./(components)/edit-assignor-form";
import { useEffect, useState } from "react";
import { apiCall } from "@/lib/api-call";
import { AssignorEntity } from "@/interfaces/assignor.interface";

export default function Page() {
  const param = useParams<{ id: string }>();
  const [assignor, setAssignor] = useState<Required<AssignorEntity>>();
  useEffect(() => {
    apiCall<Required<AssignorEntity>>({
      endpoint: `/integrations/assignors/${param.id}?includeAssignor=true`,
      method: 'GET',
    }).then((res) => {
      setAssignor(res.result);
    });
  }, [param.id]);

  return (
    <div>
      <EditAssignorForm id={param.id} assignor={assignor} />
    </div>
  );
}
