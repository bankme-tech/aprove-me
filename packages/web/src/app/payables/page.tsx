"use client";

import { PayableList } from "@/components/payable-list";
import { WithAuth } from "@/lib/with-auth";

export default WithAuth(function PayablesPage() {
  return (
    <div className="h-screen w-screen flex gap-3 ">
      <PayableList payables={[]} />
    </div>
  );
});
