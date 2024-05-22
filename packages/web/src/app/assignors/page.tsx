"use client";

import { Suspense } from "react";
import { WithAuth } from "@/lib/with-auth";
import { AssignorList } from "@/components/assignor-list";

export default WithAuth(function AssignorsPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Suspense fallback={<p className="mx-auto mt-20">Carregando...</p>}>
        <AssignorList />
      </Suspense>
    </div>
  );
});
