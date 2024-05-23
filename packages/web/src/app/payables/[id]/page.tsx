"use client";

import getPayable from "@/api/getPayable";
import { WithAuth } from "@/lib/with-auth";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import PayableCard, { Payable } from "@/components/payable-card";

type PayablePageProps = {
  params: {
    id: string;
  };
};

export default WithAuth(function PayablePage({ params }: PayablePageProps) {
  const [isLoading, setLoading] = useState(true);
  const [payable, setPayable] = useState<Payable | undefined>(undefined);

  useEffect(() => {
    const fetchPayable = async () => {
      const data = await getPayable(params.id);

      setPayable(data);
      setLoading(false);
    };

    fetchPayable();
  }, [params.id]);

  return (
    <div className="flex flex-col mt-10 w-fit mx-auto">
      <Suspense fallback={<p className="mx-auto mt-20">Carregando...</p>}>
        {isLoading ? (
          <></>
        ) : (
          <>
            <PayableCard payable={payable!} />
            <Button variant="outline" className="mt-5">Editar</Button>
            <Button variant="destructive" className="mt-5">Remover</Button>
          </>
        )}
      </Suspense>
    </div>
  );
});
