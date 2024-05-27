import { useContext } from "react";
import { PayableContext } from "./payable.context";

export const usePayable = () => {
  const { payables, createPayable, getPayable } = useContext(PayableContext);

  return { payables, createPayable, getPayable };
};
