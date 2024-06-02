import { useContext } from "react";
import { DashboardContext } from ".";

export function useDashboard() {
  return useContext(DashboardContext)
}
