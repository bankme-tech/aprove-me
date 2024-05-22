"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
export default function AssignorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect("/auth");
  }

  return isAuthenticated && children;
}
