"use client";
import CreatePayableForm from "@/components/payable/create-payable";
import PayableTable from "@/components/payable/payable-table";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, []);

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
