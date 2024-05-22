"use client";

import { Suspense } from "react";
import { WithAuth } from "@/lib/with-auth";
import { PayableList } from "@/components/payable-list";

export default WithAuth(function PayablesPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Suspense fallback={<p className="mx-auto mt-20">Carregando...</p>}>
        <PayableList />
      </Suspense>
    </div>
  );
});
