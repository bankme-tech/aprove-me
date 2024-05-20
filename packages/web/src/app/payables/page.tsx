"use client";
import { PayableList } from "@/components/payable-list";

export default function PayablesPage() {
  return (
    <div className="h-screen w-screen flex gap-3 ">
      <PayableList payables={[]} />
    </div>
  );
}

