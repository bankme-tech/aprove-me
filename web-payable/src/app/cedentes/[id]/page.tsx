"use client";

import { apiCall } from "@/lib/api-call";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const param = useParams<{ id: string }>();
  const [assignor, setAssignor] = useState(null);

  useEffect(() => {
    apiCall({ endpoint: `/integrations/assignors/${param.id}`, method: 'GET' })
      .then((res) => setAssignor(res.result));
    // TODO: catch((err) => toaster)
  }, [param.id]);

  return (
    <div>
      <h1>Cedentes by id</h1>
      <p>{JSON.stringify(assignor)}</p>
    </div>
  );
}
