"use client";

import { WithAuth } from "@/lib/with-auth";
import { PayableList } from "@/components/payable-list";

export default WithAuth(function PayablesPage() {
  return (
    <div className="h-screen w-screen flex gap-3 ">
      <PayableList />
    </div>
  );
});
