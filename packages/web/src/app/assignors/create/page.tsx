"use client";

import { WithAuth } from "@/lib/with-auth";
import { CreateAssignorForm } from "@/components/create-assignor-form";

export default WithAuth(function CreateAssignorPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <CreateAssignorForm />
    </div>
  );
});
