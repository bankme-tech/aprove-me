"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiCall } from "@/lib/api-call";
import { PayableEntity } from "@/interfaces/payable.interface";
import EditPayableForm from "./(components)/edit-payable-form";

export default function Page() {
  const param = useParams<{ id: string }>();
  const [payable, setPayable] = useState<Required<PayableEntity> | undefined>();

  useEffect(() => {
    apiCall<Required<PayableEntity>>({
      endpoint: `/integrations/payable/${param.id}?includeAssignor=true`,
      method: 'GET',
    }).then((res) => {
      setPayable(res.result);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between p-12">
      <EditPayableForm id={param.id} payable={payable} />
    </div>
  );
}
