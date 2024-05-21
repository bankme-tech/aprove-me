"use client";

import { AssignorList } from "@/components/assignor-list";

export default function PayablesPage() {
  return (
    <div className="h-screen w-screen flex gap-3 ">
      <AssignorList assignors={[]} />
    </div>
  );
}
