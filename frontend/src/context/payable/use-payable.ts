import { useContext } from "react";
import { PayableContext } from "./payable.context";

export const usePayable = () => {
  const { payables, createPayable, getPayable, getAllPayables } =
    useContext(PayableContext);

  return { payables, createPayable, getPayable, getAllPayables };
};
