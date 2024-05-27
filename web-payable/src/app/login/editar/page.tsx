"use client";

import { apiCall } from "@/lib/api-call";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const param = useParams<{ id: string }>();
  const [payable, setPayable] = useState(null);

  useEffect(() => {
    apiCall({ endpoint: `/integrations/payable/${param.id}`, method: 'GET' })
      .then((res) => setPayable(res.result));
    // TODO: catch((err) => toaster)
  }, [param.id]);

  return (
    <div>
      <h1>Pagável by id</h1>
      <p>{JSON.stringify(payable)}</p>
    </div>
  );
}
