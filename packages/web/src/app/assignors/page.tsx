"use client";

import { WithAuth } from "@/lib/with-auth";
import { AssignorList } from "@/components/assignor-list";

export default WithAuth(function PayablesPage() {
  return (
    <div className="h-screen w-screen flex gap-3 ">
      <AssignorList assignors={[]} />
    </div>
  );
});
