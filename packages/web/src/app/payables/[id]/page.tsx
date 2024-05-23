"use client";

import getPayable from "@/api/getPayable";
import { WithAuth } from "@/lib/with-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import deletePayable from "@/api/deletePayable";
import { Suspense, useEffect, useState } from "react";
import PayableCard, { Payable } from "@/components/payable-card";

type PayablePageProps = {
  params: {
    id: string;
  };
};

export default WithAuth(function PayablePage({ params }: PayablePageProps) {
  const router = useRouter();
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

  const handleDelete = async () => {
    try {
      const status = await deletePayable(params.id);
      if (status === 204) {
        router.back();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col mt-10 w-fit mx-auto">
      <Suspense fallback={<p className="mx-auto mt-20">Carregando...</p>}>
        {isLoading ? (
          <></>
        ) : (
          <>
            <PayableCard payable={payable!} />
            <Button variant="outline" className="mt-5">
              Editar
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="mt-5">
              Remover
            </Button>
          </>
        )}
      </Suspense>
    </div>
  );
});
