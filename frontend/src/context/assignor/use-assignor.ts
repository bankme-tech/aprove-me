import { useContext } from "react";
import { AssignorContext } from "./assignor.context";

export const useAssignor = () => {
  const { assignors, createAssignor, getAssignor, getAllAssignors } =
    useContext(AssignorContext);

  return { assignors, createAssignor, getAssignor, getAllAssignors };
};
