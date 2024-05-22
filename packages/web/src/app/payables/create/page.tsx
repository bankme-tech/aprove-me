"use client";

import { WithAuth } from "@/lib/with-auth";
import { CreatePayableForm } from "@/components/create-payable-form";

export default WithAuth(function CreatePayablesPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <CreatePayableForm />
    </div>
  );
});
