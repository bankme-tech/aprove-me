"use client";
import CreatePayableForm from "@/components/payable/create-payable";
import PayableTable from "@/components/payable/payable-table";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function page() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect("/auth");
  }
  
  return (
    isAuthenticated && (
      <div className="py-8 container flex flex-col justify-center">
        <div className="flex self-start my-4">
          <CreatePayableForm />
        </div>
        <PayableTable />
      </div>
    )
  );
}
