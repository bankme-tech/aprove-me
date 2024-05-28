"use client";

import { Assignor } from "@/@core/domain/entities/assignor.entity";
import { AssignorCard } from "@/components/cards/assignor-card";
import { useAssignor } from "@/context/assignor/use-assignor";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AssignorDetails({
  params,
}: {
  params: { id: string };
}) {
  const { getAssignor } = useAssignor();
  const [assignor, setAssignor] = useState<Assignor | null>(null);

  const { isLoading } = useQuery({
    queryKey: ["assignor", params.id],
    queryFn: async () => {
      const response = await getAssignor(params.id);
      setAssignor(response);
      return response;
    },
  });

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!assignor) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Erro</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen ">
      <AssignorCard
        id={assignor.id}
        name={assignor.name}
        document={assignor.document}
        email={assignor.email}
        phone={assignor.phone}
      />
    </main>
  );
}
